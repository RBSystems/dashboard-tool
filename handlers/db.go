package handlers

import (
	"net/http"

	"github.com/byuoitav/common/db"
	"github.com/byuoitav/common/log"
	"github.com/labstack/echo"
)

func GetBuildings(context echo.Context) error {
	log.L.Debug("[bldg] Starting GetBuildings...")

	// if !Dev {
	// 	ok, err := auth.VerifyRoleForUser(context.Request().Context().Value("user").(string), "read")
	// 	if err != nil {
	// 		log.L.Errorf("[bldg] Failed to verify read role for %s : %v", context.Request().Context().Value("user").(string), err.Error())
	// 		return context.JSON(http.StatusInternalServerError, err.Error())
	// 	}
	// 	if !ok {
	// 		log.L.Warnf("[bldg] User %s is not allowed to get all buildings.", context.Request().Context().Value("user").(string))
	// 		return context.JSON(http.StatusForbidden, alert)
	// 	}
	// }

	log.L.Debug("[bldg] Attempting to get all buildings")

	buildings, err := db.GetDB().GetAllBuildings()
	if err != nil {
		log.L.Errorf("[bldg] Failed to get all buildings : %v", err.Error())
		return context.JSON(http.StatusBadRequest, err.Error())
	}

	log.L.Debug("[bldg] Successfully got all buildings!")
	return context.JSON(http.StatusOK, buildings)
}

//GetRoomsByBuilding returns all the rooms in a room
func GetRoomsByBuilding(context echo.Context) error {
	log.L.Debug("[room] Starting GetRoomsByBuilding...")

	// if !Dev {
	// 	ok, err := auth.VerifyRoleForUser(context.Request().Context().Value("user").(string), "read")
	// 	if err != nil {
	// 		log.L.Errorf("[room] Failed to verify read role for %s : %v", context.Request().Context().Value("user").(string), err.Error())
	// 		return context.JSON(http.StatusInternalServerError, err.Error())
	// 	}
	// 	if !ok {
	// 		log.L.Warnf("[room] User %s is not allowed to get all rooms in a room.", context.Request().Context().Value("user").(string))
	// 		return context.JSON(http.StatusForbidden, alert)
	// 	}
	// }

	buildingID := context.Param("building")

	log.L.Debugf("[room] Attempting to get all rooms in %s", buildingID)

	rooms, err := db.GetDB().GetRoomsByBuilding(buildingID)

	if err != nil {
		log.L.Errorf("[room] An error occurred while getting all rooms in the room %s: %v", buildingID, err.Error())
		return context.JSON(http.StatusBadRequest, err.Error())
	}

	log.L.Debugf("[room] Successfully got all rooms in the room %s!", buildingID)
	return context.JSON(http.StatusOK, rooms)
}

// GetAllRooms returns all rooms from the database.
func GetAllRooms(context echo.Context) error {
	log.L.Debug("[room] Starting GetAllRooms...")

	// if !Dev {
	// 	ok, err := auth.VerifyRoleForUser(context.Request().Context().Value("user").(string), "read")
	// 	if err != nil {
	// 		log.L.Errorf("[room] Failed to verify read role for %s : %v", context.Request().Context().Value("user").(string), err.Error())
	// 		return context.JSON(http.StatusInternalServerError, err.Error())
	// 	}
	// 	if !ok {
	// 		log.L.Warnf("[room] User %s is not allowed to get all rooms.", context.Request().Context().Value("user").(string))
	// 		return context.JSON(http.StatusForbidden, alert)
	// 	}
	// }

	log.L.Debug("[room] Attempting to get all rooms")

	rooms, err := db.GetDB().GetAllRooms()
	if err != nil {
		log.L.Errorf("[room] Failed to get all rooms : %v", err.Error())
		return context.JSON(http.StatusBadRequest, err.Error())
	}

	log.L.Debug("[room] Successfully got all rooms!")
	return context.JSON(http.StatusOK, rooms)
}

// GetDevicesByRoomAndRole returns all of the devices in a room of a certain role.
func GetDevicesByRoomAndRole(context echo.Context) error {
	log.L.Debug("[device] Starting GetDevicesByRoom...")

	// if !Dev {
	// 	ok, err := auth.VerifyRoleForUser(context.Request().Context().Value("user").(string), "read")
	// 	if err != nil {
	// 		log.L.Errorf("[device] Failed to verify read role for %s : %v", context.Request().Context().Value("user").(string), err.Error())
	// 		return context.JSON(http.StatusInternalServerError, err.Error())
	// 	}
	// 	if !ok {
	// 		log.L.Warnf("[device] User %s is not allowed to get all devices in a room.", context.Request().Context().Value("user").(string))
	// 		return context.JSON(http.StatusForbidden, alert)
	// 	}
	// }

	roomID := context.Param("room")
	role := context.Param("role")

	log.L.Debugf("[device] Attempting to get all devices in %s with the role %s", roomID, role)

	devices, err := db.GetDB().GetDevicesByRoomAndRole(roomID, role)
	if err != nil {
		log.L.Errorf("[device] An error occurred while getting all devices in the room %s with the role %s: %v", roomID, role, err.Error())
		return context.JSON(http.StatusInternalServerError, err.Error())
	}

	log.L.Debugf("[device] Successfully got all devices in the room %s with the role %s!", roomID, role)
	return context.JSON(http.StatusOK, devices)
}

// GetDevicesByRoleAndType returns all of the devices of a certain role and type.
func GetDevicesByRoleAndType(context echo.Context) error {
	log.L.Debug("[device] Starting GetDevicesByRoom...")

	// if !Dev {
	// 	ok, err := auth.VerifyRoleForUser(context.Request().Context().Value("user").(string), "read")
	// 	if err != nil {
	// 		log.L.Errorf("[device] Failed to verify read role for %s : %v", context.Request().Context().Value("user").(string), err.Error())
	// 		return context.JSON(http.StatusInternalServerError, err.Error())
	// 	}
	// 	if !ok {
	// 		log.L.Warnf("[device] User %s is not allowed to get all devices in a room.", context.Request().Context().Value("user").(string))
	// 		return context.JSON(http.StatusForbidden, alert)
	// 	}
	// }

	typeID := context.Param("type")
	role := context.Param("role")

	log.L.Debugf("[device] Attempting to get all devices with the role %s and the type %s", role, typeID)

	devices, err := db.GetDB().GetDevicesByRoleAndType(role, typeID)
	if err != nil {
		log.L.Errorf("[device] An error occurred while getting all devices with the role %s and the type %s: %v", role, typeID, err.Error())
		return context.JSON(http.StatusInternalServerError, err.Error())
	}

	log.L.Debugf("[device] Successfully got all devices with the role %s and the type %s!", role, typeID)
	return context.JSON(http.StatusOK, devices)
}
