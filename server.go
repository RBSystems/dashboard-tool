package main

import (
	"net/http"

	"github.com/byuoitav/dashboard-tool/handlers"
	"github.com/byuoitav/state-parser/elk"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {

	port := ":9998"
	router := echo.New()
	router.Pre(middleware.RemoveTrailingSlash())
	router.Use(middleware.CORS())

	router.GET("/getPIList", getPIList)
	router.GET("/deploy/:hostname", handlers.Deploy)
	router.GET("/buildings", handlers.GetBuildings)
	router.GET("/buildings/:building/rooms", handlers.GetRoomsByBuilding)
	router.GET("/rooms", handlers.GetAllRooms)
	router.GET("/rooms/:room/roles/:role", handlers.GetDevicesByRoomAndRole)
	router.GET("/roles/:role/types/:type", handlers.GetDevicesByRoleAndType)

	router.Static("/ui", "ui")

	server := http.Server{
		Addr:           port,
		MaxHeaderBytes: 1024 * 10,
	}

	router.StartServer(&server)
}

//getPIList makes a request to ELK to get the room and hostname of the PIs we want to query.
func getPIList(context echo.Context) error {

	query := `{
		"_source": [
			"room",
			"hostname"
		],
		"query": {
		  "bool": {
			"must": {
			  "match": {
				"_type": "control-processor"
			  }
			}
		  }
		},
		"size": 1000
	  }`

	body, err := elk.MakeELKRequest("POST", "/oit-static-av-devices/_search", []byte(query))

	if err != nil {
		return context.JSON(http.StatusInternalServerError, err)
	} else {
		return context.JSONBlob(http.StatusOK, body)
	}

}
