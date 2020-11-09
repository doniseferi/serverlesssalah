# serverlesssalah

<p align="center" background-color="white">
<img src="https://raw.githubusercontent.com/doniseferi/serverlesssalah/25419819860f97fae42fc78913ea09d9202a2696/serverlesssalah.svg" width="400px" />
</p>

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/198b48bc85e44ff0b7860857ac78f902)](https://app.codacy.com/gh/doniseferi/serverlesssalah?utm_source=github.com&utm_medium=referral&utm_content=doniseferi/serverlesssalah&utm_campaign=Badge_Grade)
[![GitHub license](https://img.shields.io/github/license/doniseferi/serverlesssalah)](https://github.com/doniseferi/serverlesssalah/blob/master/LICENCE.md)
![Docker Image Version (latest by date)](https://img.shields.io/docker/v/doniseferi/serverlesssalah?style=plastic) ![GitHub last commit](https://img.shields.io/github/last-commit/doniseferi/serverlesssalah)

---

1. [Purpose](#purpose)
2. [Prerequisites](#prerequisites)
3. [Authentication Notes](#authnotes)
4. [Endpoints](#endpoints)
   1. [Fajr](#fajr)
   2. [Dhuhr](#dhuhr)
   3. [Asr](#asr)
   4. [Maghrib](#maghrib)
   5. [Ishaa](#ishaa)

## <a name="purpose"></a>Purpose

A simple example serveless application using the Azure Functions service in Typescript. Included is a `Dockerfile` for the image and a `docker-compose` file for running the image locally with authentication turned on as [all authentication is turned off locally by Microsoft](#authnotes).

---

## <a name="prerequisites"></a> Prerequisites

For the purpose of running the image [docker](https://docs.docker.com/get-docker/) and for local debugging and development the LTS version of [node.js](https://nodejs.org/en/download/) is required

- Run `npm install` from the root directory

---

## <a name="authnotes"></a>Authentication Notes

All functions in this project have an authentication level of type '_function_' therefor on execution authentication credentials must be provided via a _code_ query string.
[From Azure Functions docs:](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=csharp#api-key-authorization)

> When running functions locally, authorization is disabled regardless of the specified authorization level setting. After publishing to Azure, the authLevel setting in your trigger is enforced. Keys are still required when running locally in a container.

To overcome the constraint of having to publish to Azure for authentication functionality, this project includes a [host.json](./e2e/keys/host.json) file that defines a key with a value of '_test_' for the purpose of testing, this must be provided on all requests for authentication otherwise the response will be of status code 401.

### Example Requests:

```
GET: /api/dhuhr/date/2022-04-22/longitude/-0.191380?code=test
```

---

## <a name="endpoints"></a>Endpoints

### <a name="fajr">**Fajr**

Http Method: **GET**

Uri Parameters:

1. **date**: [an iso 8601 date (YYYY-MM-DD)](https://www.iso.org/iso-8601-date-and-time-format.html)
2. **latitude**: [-90,90]
3. **longitude**: [-180,180]

Query Parameters:

- **highLatitudeMethod**: [_"AngleBasedMethod" | "MiddleOfTheNightMethod" | "OneSeventhMethod"_]
- **convention**: [_"MuslimWorldLeague" | "IslamicSocietyOfNorthAmerica" | "EgyptianGeneralAuthorityOfSurvey" | "UmmAlQuraUniversityMekkah" | "UniversityOfIslamicSciencesKarachi" | "InstituteOfGeophysicsUniversityOfTehranOfSurvey" | "ShiaIthnaAshariLevaResearchInstituteQumOfSurvey"_]

Example:

`/api/fajr/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?code=test`

`/api/fajr/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?highlatitudemethod=anglebasedmethod&code=test`

`/api/fajr/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?convention=EgyptianGeneralAuthorityOfSurvey&code=test`

`/api/fajr/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?highlatitudemethod=anglebasedmethod&convention=MuslimWorldLeague&code=test`

### <a name="dhuhr">**Dhuhr**

Http Method: **GET**

Uri Parameters:

1. **date**: [an iso 8601 date (YYYY-MM-DD)](https://www.iso.org/iso-8601-date-and-time-format.html)
2. **longitude**: [-180,180]

Example:

`/api/dhuhr/date/2025-01-18/longitude/-0.191380?code=test`

### <a name="asr">**Asr**

Http Method: **GET**

Uri Parameters:

1. **date**: [an iso 8601 date (YYYY-MM-DD)](https://www.iso.org/iso-8601-date-and-time-format.html)
2. **latitude**: [-90,90]
3. **longitude**: [-180,180]

Query Parameters:

- **madhab**: [_"Standard" | "Shafii" | "Maliki" | "Hanbali" | "Hanafi"_]

Example:

`/api/asr/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?code=test`

`/api/asr/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?madhab=Hanafi&code=test`

### <a name="maghrib">**Maghrib**

Http Method: **GET**

Uri Parameters:

1. **date**: [an iso 8601 date (YYYY-MM-DD)](https://www.iso.org/iso-8601-date-and-time-format.html)
2. **latitude**: [-90,90]
3. **longitude**: [-180,180]

Example:

`/api/maghrib/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?code=test`

### <a name="ishaa">**Ishaa**

Http Method: **GET**

Uri Parameters:

1. **date**: [an iso 8601 date (YYYY-MM-DD)](https://www.iso.org/iso-8601-date-and-time-format.html)
2. **latitude**: [-90,90]
3. **longitude**: [-180,180]

Query Parameters:

- **highLatitudeMethod**: [_"AngleBasedMethod" | "MiddleOfTheNightMethod" | "OneSeventhMethod"_]
- **convention**: [_"MuslimWorldLeague" | "IslamicSocietyOfNorthAmerica" | "EgyptianGeneralAuthorityOfSurvey" | "UmmAlQuraUniversityMekkah" | "UniversityOfIslamicSciencesKarachi" | "InstituteOfGeophysicsUniversityOfTehranOfSurvey" | "ShiaIthnaAshariLevaResearchInstituteQumOfSurvey"_]

Example:

`/api/ishaa/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?code=test`

`/api/ishaa/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?highlatitudemethod=anglebasedmethod&code=test`

`/api/ishaa/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?convention=EgyptianGeneralAuthorityOfSurvey&code=test`

`/api/ishaa/date/2025-01-18/latitude/51.515059/longitude/-0.191380.01015?highlatitudemethod=anglebasedmethod&convention=UniversityOfIslamicSciencesKarachi&code=test`

---

**_and as always, thanks for lookin'_** - _Edonis_ 😊
