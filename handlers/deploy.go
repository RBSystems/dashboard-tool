package handlers

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/byuoitav/common/log"
	"github.com/labstack/echo"
)

func Deploy(context echo.Context) error {
	log.L.Infof("Starting to deploy!")

	hostname := context.Param("hostname")
	address := os.Getenv("RASPI_DEPLOYMENT_MICROSERVICE_WSO2_ADDRESS")
	header := os.Getenv("RASPI_DEPLOYMENT_MICROSERVICE_WSO2_HEADER")
	h := strings.Split(header, ":")

	url := fmt.Sprintf("%s_device/%s", address, hostname)

	log.L.Infof("deploying to: %s", hostname)
	log.L.Infof("H0: %s", h[0])
	log.L.Infof("H1: %s", h[1])
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.L.Errorf("There was a problem. %s", err.Error())
	}

	req.Header.Set("Accept", "application/json")
	req.Header.Set(h[0], h[1])

	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.L.Errorf("Problem doing the request. %s", err.Error())
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.L.Errorf("Problem reading resp body %s", err.Error())
	}

	if resp.StatusCode/100 != 2 {
		log.L.Errorf("There was an Error: %s", body)
		return context.JSON(resp.StatusCode, body)
	}

	return context.JSON(http.StatusOK, "Deployment Successful")
}
