Okay, here's the OCR content converted to Markdown. I've tried to preserve the structure, headings, tables, and code blocks as accurately as possible.

```markdown
# 1. Introduction
**Lead Posting Specifications**

This document will explain the posting method, provide sample requests, sample responses, and the sample code to help you with posting. This information is subject to change without notice. This document contains confidential and proprietary business information and is only distributed in accordanceance with a signed confidentiality agreement. Any use or distribution not expressly allowed by the confidentiality agreement is strictly prohibited.

# 2. Overview
**Method:** Phonexa accepts leads through the HTTP POST process. Lead generators are asked to send leads via HTTP POST to the URL specified in the Leads Specs section.

**Format/Data Type:** JSON or FORM

**Fields:** Phonexa API contains both required and optional fields. Phonexa will not accept a lead when any of the required fields are omitted, or the value of those fields is null or blank. Phonexa also has some specific formatting for particular fields. If the formatting is incorrect, the lead will be rejected. Data can be sent in the request in any order, but **all of the field names are case sensitive and must match examples in the specifications, including capitalization (e.g., cApiTaLiZaTioN).**

**Testing:** To enable the test mode, add the **testMode=1** parameter in the request. You can use the live credentials for testing. When sending leads in the test mode, Phonexa will provide valid responses to help you with the integration set up process. Responses will indicate the status of the lead as well as possible errors. Test leads must contain data similar to real leads, and you can send as many test leads as needed. Make sure you remove the testMode=1 parameter once you are done testing to start sending live leads.

**Ping/Post Method:** The Ping/Post method allows lead generators to ping the system with partial lead data first and get a response from the system before submitting the full data. Use the PING + POST strategy to submit a ping first to get a response from the system and then, based on the response, post the full lead data. You can also use the Full Post strategy to post the full lead data in one request. Please note that Phonexa will still process the request as a ping and a post when using the Full Post strategy.

# 3. iClick Home Services FIELDS
Use either **PING + POST** strategy, or **Full Post** strategy

## 3.1 PING
**Posting Url:**
`https://leads-inst523-client.phonexa.com/ping/`

| Field Name      | Required                                    | Description                                                                                                | Format                                    | Example                                                                      |
|-----------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------|-------------------------------------------|------------------------------------------------------------------------------|
| apiId           | YES                                         | Your API authentication ID: **BEB36867357C435CA9FE69AACB4D9909** (should be unique to each channel)          | Length 1-64                               | myusername                                                                   |
| apiPassword     | YES                                         | Your API authentication password: **00c1e7396**                                                            | String                                    |                                                                              |
| productId       | YES                                         | Please set this value to 267                                                                               | Integer                                   | 267                                                                          |
| email           | NO                                          | Email address, text value                                                                                  | Length 5-128                              | john.n@yahoo.com                                                             |
| tcpa            | YES                                         | Is lead TCPA compliant?                                                                                    | One of the following: [`NA`, `YES`, `NO`] | NA                                                                           |
| tcpaLanguage    | YES                                         | TCPA Consent Text                                                                                          | Length 0-4000                             | Agreement text                                                               |
| userAgent       | YES                                         | HTTP_USER_AGENT string of the customer's web browser.                                                      | Length 0-254                              | Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)      |
| jornayaLeadId   | NO                                          | Jornaya Lead Id                                                                                            | Length 1-255                              | 0F0F0F0F-0F0F-0F0F-0F0F-0F0F0F0F0F0F                                         |
| trustedFormURL  | NO                                          | Trusted Form Certificate URL                                                                               | Length 1-255                              | https://cert.trustedform.com/0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f/          |
| webSiteUrl      | YES                                         | Website URL                                                                                                | Length 0-254                              | http://www.mysite.com                                                        |
| firstName       | NO                                          | First name of the customer.                                                                                | Length 0-254                              | John                                                                         |
| lastName        | NO                                          | Las name of the customer.                                                                                  | Length 0-254                              | Smith                                                                        |
| phoneNumber     | NO                                          | Phone number, text value                                                                                   | Length 3-12                               | 2123123123                                                                   |
| address         | NO                                          | Customers address                                                                                          | Length 0-254                              | my address                                                                   |
| city            | NO                                          | City                                                                                                       | Length 0-254                              | Glendale                                                                     |
| state           | NO                                          | State                                                                                                      | Length 2                                  | CA                                                                           |
| zip             | YES                                         | 5-digit zip code, numeric value                                                                            | Length 5-8                                | 90210                                                                        |
| userIp          | YES                                         | IP of the customer.                                                                                        | Length 0-254                              | 64.60.147.1                                                                  |
| bestCallTime    | YES                                         | Best time to call the customer.                                                                            | Length 0-254                              | Anytime                                                                      |
| purchaseTimeFrame | YES                                         | Purchase Time Frame                                                                                        | One of the following: [`Immediately`, `Within_1_month`, `1-3_months`, `more_than_3_months`] | more_than_3_months                                                           |
| ownHome         | YES                                         | One of the following: [`YES`, `NO`]                                                                        | One of the following: [`NA`, `YES`, `NO`] | NO                                                                           |
| creditRating    | NO                                          | Any string value up to 254 symbols                                                                         | Length 0-254                              | excellent                                                                    |
| jobType         | YES                                         | Home Services job type.                                                                                    | One of the following: [`additions`, `bathroom`, `cabinets`, `deck`, `doors`, `electrical`, `fencing`, `flooring`, `garage_doors`, `gutters`, `handy_man`, `home_security`, `hvac`, `insulation`, `kitchen`, `landscaping`, `painting`, `pest_control`, `plumbing`, `remodeling`, `roof`, `siding`, `stair_lift`, `sunrooms`, `swimming_pool`, `trees`, `windows`] | roof                                                                         |
| addition_type   | NO Unless (`@jobType` = "additions")        | Type of addition.                                                                                          | One of the following: [`Ground_floor`, `Second_floor`, `Other`] | Second floor                                                                 |
| bathroomProjectType | NO Unless (`@jobType` = "bathroom")         | Bathroom Project Type                                                                                      | One of the following: [`Bath_sinks`, `Full_bathroom`, `Tile`] | Tile                                                                         |
| cabinetsProjectType | NO Unless (`@jobType` = "cabinets")         | Cabinets Project Type                                                                                      | One of the following: [`Install_new_custom_cabinets`, `Install_new_pre-made_cabinets`, `Repair_existing_cabinets`, `Reface_existing_cabinets`] | Repair existing cabinets                                                     |
| deckMaterial    | NO Unless (`@jobType` = "deck")             | Material used for deck.                                                                                    | One of the following: [`Composite`, `Wood`, `Other`] | Wood                                                                         |
| doorProjectType | NO Unless (`@jobType` = "doors")            | Doors Project type                                                                                         | One of the following: [`New_installation`, `Repair`] | Repair                                                                       |
| doorsMaterial   | NO Unless (`@jobType` = "doors")            | Material used for the doors.                                                                               | One of the following: [`Wood`, `Metal`, `Composite`, `Other`] | Wood                                                                         |
| preHung         | NO Unless (`@jobType` = "doors")            | Is the door pre-hung?                                                                                      | One of the following: [`YES`,`NO`]        | YES                                                                          |
| electricalProjectType | NO Unless (`@jobType` = "electrical")     | Electrical project type.                                                                                   | One of the following: [`Install`, `Repair`] | Install                                                                      |
| electricalServiceType | NO Unless (`@jobType` = "electrical")     | Electrical Service Type                                                                                    | One of the following: [`Electric_for_home_addition_or_remodel`, `Electrical_wiring_or_panel_upgrade`, `Generator`, `Home_energy_audit`, `Low_voltage_wiring`, `Outdoor_lighting`] | Generator                                                                    |
| fenceType       | NO Unless (`@jobType` = "fencing")          | Fence Type                                                                                                 | One of the following: [`Wood`, `Metal`, `Composite`, `Electric`, `Other`] | Wood                                                                         |
| flooringInquiyType | NO Unless (`@jobType` = "flooring")        | The type of inquiry for flooring.                                                                          | One of the following: [`Installation`, `Repair`] | Repair                                                                       |
| flooringType    | NO Unless (`@jobType` = "flooring")        | Flooring Type                                                                                              | One of the following: [`Hardwood`, `Vinyl`, `Carpet`, `Tile`, `Composite`] | Hardwood                                                                     |
| garageDoorsProjectType | NO Unless (`@jobType` = "garage_doors") | Garage Project Type                                                                                        | One of the following: [`New_Construction`, `Replacement`] | Replacement                                                                  |
| numberOfDoors   | NO Unless (`@jobType` = "garage_doors") | Number of Garage Doors.                                                                                    | Length 1-200                              | 1                                                                            |
| carryWeight     | NO Unless (`@jobType` = "stair_lift")       | The weight the stair lift will carry.                                                                      | Numeric 0-300                             | 120                                                                          |
| homeSecurityBuildingType | NO Unless (`@jobType` = "home_security") | Building type you would need Home Security for.                                                            | One of the following: [`House`, `Condo_unit_or_apartment`, `Office`, `Large_building`, `Other`] | Office                                                                       |
| hvacAirType     | NO Unless (`@jobType` = "hvac")             | HVAC Air Type                                                                                              | One of the following: [`Cooling`, `Heating`, `Heating_and_cooling`] | Heating                                                                      |
| hvacProjectType | NO Unless (`@jobType` = "hvac")             | HVAC Project Type                                                                                          | One of the following: [`New_unit_installed`, `Repair`] | Repair                                                                       |
| hvacSystemType  | NO Unless (`@jobType` = "hvac")             | HVAC System Type                                                                                           | One of the following: [`Central_AC`, `Gas_boiler`, `Propane_boiler`, `Oil_boiler`, `Electric_boiler`, `Heat_pump`, `Water_heater`, `Gas_furnace`, `Propane_furnace`, `Oil_furnace`, `Electric_furnace`] | Central_AC                                                                   |
| insulationServiceType | NO Unless (`@jobType` = "insulation")     | Insulation Service Type                                                                                    | One of the following: [`Blown_in`, `Spray_foam`, `Batten`] | Batten                                                                       |
| kitchenProjectType | NO Unless (`@jobType` = "kitchen")          | Kitchen Project Type                                                                                       | One of the following: [`Floor_plan`, `Cabinets`, `Appliances`, `Counter_tops_or_sinks`, `Flooring`] | Flooring                                                                     |
| landscapingProjectType | NO Unless (`@jobType` = "landscaping")    | Landscaping Project Type                                                                                   | One of the Following: [`Landscaping`, `Lawn_Care`, `Sprinklers`] | Landscaping                                                                  |
| landscapingServiceType | NO Unless (`@jobType` = "landscaping")    | Landscaping Service Type                                                                                   | One of the following: [`Front_Yard`, `Back_Yard`] | Front_Yard                                                                   |
| numStairs       | NO Unless (`@jobType` = "stair_lift")       | Number of stairs that you have.                                                                            | Numeric 0-300                             | 5                                                                            |
| openers         | NO Unless (`@jobType` = "garage_doors") | Are openers present?                                                                                       | One of the following: [`YES`, `NO`]       | YES                                                                          |
| paintingProjectType | NO Unless (`@jobType` = "painting")       | Painting Project Type                                                                                      | One of the following: [`Exterior_Painting`, `Interior_Painting`, `Specialty_Painting_Faux_Finishes`, `Specialty_Painting_Textures`, `Other`] | Exterior_Painting                                                            |
| pestControlProjectType | NO Unless (`@jobType` = "pest_control")   | Pest Control Project Type                                                                                  | One of the following: [`Ant_Control`, `Bee_Removal`, `Small_animals`, `Termites`] | Ant_Control                                                                  |
| plumbingProjectType | NO Unless (`@jobType` = "plumbing")       | Plumbing Project Type                                                                                      | One of the following: [`Install`, `Repair`] | Install                                                                      |
| plumbingServiceType | NO Unless (`@jobType` = "plumbing")       | Plumbing Service Type                                                                                      | One of the following: [`Drain_cleaning`, `Install_or_repair_water_heater`, `Plumbing_work`, `Septic_install_or_replace`, `Septic_repair`, `Septic_clean_or_pump_out`, `Sewer_main`, `Well_pumps`, `Water_main`] | Drain_cleaning                                                               |
| poolType        | NO Unless (`@jobType` = "swimming_pool")  | Pool Type                                                                                                  | One of the following: [`Swimming_Pool`, `Sauna`, `Hot_Tub`] | Sauna                                                                        |
| protection      | NO Unless (`@jobType` = "gutter")           | Is gutter protection requested?                                                                            | One of the following: [`YES`, `NO`]       | YES                                                                          |
| remodelingLocationInHome | NO Unless (`@jobType` = "remodeling")   | The location you are going to need remodeling.                                                             | One of the following: [`Bathroom`, `Basement`, `Kitchen`] | Bathroom                                                                     |
| remodelingProjectType | NO Unless (`@jobType` = "remodeling")   | Remodeling Project Type                                                                                    | One of the following: [`Multiple_Rooms`, `Single_Room`] | Multiple_Rooms                                                               |
| roofProjectType | NO Unless (`@jobType` = "roof")             | Roof Project type                                                                                          | One of the following: [`New_roof_for_new_home`, `New_roof_for_an_existing_home`, `Repair`, `Shingle_over_existing_roof`] | Repair                                                                       |
| roofingType     | NO Unless (`@jobType` = "roof")             | Roofing Type                                                                                               | One of the following: [`Asphalt_shingle`, `Cedar_shake`, `Metal`, `Tar`, `Tile`, `Natural_state`] | Metal                                                                        |
| sidingProjectType | NO Unless (`@jobType` = "siding")         | Siding Project Type                                                                                        | One of the following: [`Replace_siding`, `Siding_repair`] | Siding_repair                                                                |
| sidingType      | NO Unless (`@jobType` = "siding")         | Siding Type                                                                                                | One of the following: [`Vinyl`, `Wood`, `Metal`, `Stucco`, `Brick_or_stone`, `Other`] | Metal                                                                        |
| stairLiftProjectType | NO Unless (`@jobType` = "stair_lift")     | Stair Lift Project Type                                                                                    | One of the following: [`Private`, `Public`] | Private                                                                      |
| stairLiftStairType | NO Unless (`@jobType` = "stair_lift")     | The stair type that you will be needing the stair lift for.                                                | One of the following: [`Straight_staircase`, `Curved_staircase`] | Straight_staircase                                                           |
| sunroomNumRooms | NO Unless (`@jobType` = "sunroom")          | Number of rooms for the sunroom.                                                                           | Numeric 0-300                             | 2                                                                            |
| sunroomLength   | NO Unless (`@jobType` = "sunroom")          | Length of the sunroom.                                                                                     | Numeric 0-300                             | 43                                                                           |
| sunroomWidth    | NO Unless (`@jobType` = "sunroom")          | Width of the sunroom.                                                                                      | Numeric 0-300                             | 30                                                                           |
| swimmingPoolProjectType | NO Unless (`@jobType` = "swimming_pool") | Swimming Pool Project Type                                                                               | One of the following: [`Indoor`, `Outdoor`] | Indoor                                                                       |
| swimmingPoolServiceType | NO Unless (`@jobType` = "swimming_pool") | Swimming Pool Service Type                                                                               | One of the following: [`Repair`, `Install`] | Repair                                                                       |
| treesProjectType | NO Unless (`@jobType` = "trees")           | Trees Project Type                                                                                         | One of the following: [`Trees`, `Shrubs`, `Stump_removal`] | Shrubs                                                                       |
| windowsProjectType | NO Unless (`@jobType` = "windows")        | Windows Project Type                                                                                       | One of the following: [`Interested_in_replacement_windows`, `Need_repair_services_at_this_time`, `Need_repair_but_interested_in_new_windows`] | Interested_in_replacement_windows                                            |
| numberOfWindows | NO Unless (`@jobType` = "windows")        | Number of windows                                                                                          | String                                    | 4                                                                            |
| creditScore     | NO                                          |                                                                                                            |                                           |                                                                              |
| testMode        | NO                                          | 1 to enable test mode. DO NOT send this parameter at all when sending live leads.                          | Integer                                   | 1                                                                            |
| clickid         | NO                                          | The data from this field is not stored anywhere in our system. It will only be used to pass as an additional parameter in buyer integrations and pixel tracking. This parameter can be seen in lead details and can be used for outbound API posting or to Fire a Pixel. | String                                    | XXX871CF-333E-4B97-A1A3-3C921A61EXXX                                         |
| tPar            | NO                                          | Additional parameter that can be used to pass fields that are not in the product. The data from this field is not stored anywhere in our system thus data passed in tPar can not be filtered. It will only be used to pass as an additional parameter in buyer integrations and pixel tracking. | Array                                     | tPar[affiliateId]=123&tPar[affiliateSubId]=123_444&tPar[transactionId]=123456&tPar[offerId]=offer-2234 |
| source          | NO                                          | Option to post either website name or affiliate source (subID). Website name needs to be in the format specified in the example. SubID can be any alphanumeric symbol, in any format. This field should not be unique. This parameter can be seen in lead details and can be used for outbound API posting or to Fire a Pixel. | String                                    | http://webiste.xxx                                                           |

## 3.2 POST
**Posting Url:**
`https://leads-inst523-client.phonexa.com/post/`

| Field Name      | Required                                    | Description                                                                                                | Format                                    | Example                                                                      |
|-----------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------|-------------------------------------------|------------------------------------------------------------------------------|
| promise         | YES                                         | The "Promise Code" received from ping                                                                      | Length 6-10                               | W_YJX3Z                                                                      |
| apiId           | YES                                         | Your API authentication ID: **BEB36867357C435CA9FE69AACB4D9909** (should be unique to each channel)          | Length 1-64                               | myusername                                                                   |
| apiPassword     | YES                                         | Your API authentication password: **00c1e7396**                                                            | String                                    |                                                                              |
| productId       | YES                                         | Please set this value to 267                                                                               | Integer                                   | 267                                                                          |
| email           | YES                                         | Email address, text value                                                                                  | Length 5-128                              | john.n@yahoo.com                                                             |
| tcpa            | YES                                         | Is lead TCPA compliant?                                                                                    | One of the following: [`NA`, `YES`, `NO`] | NA                                                                           |
| tcpaLanguage    | YES                                         | TCPA Consent Text                                                                                          | Length 0-4000                             | Agreement text                                                               |
| userAgent       | YES                                         | HTTP_USER_AGENT string of the customer's web browser.                                                      | Length 0-254                              | Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)      |
| jornayaLeadId   | NO                                          | Jornaya Lead Id                                                                                            | Length 1-255                              | 0F0F0F0F-0F0F-0F0F-0F0F-0F0F0F0F0F0F                                         |
| trustedFormURL  | NO                                          | Trusted Form Certificate URL                                                                               | Length 1-255                              | https://cert.trustedform.com/0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f/          |
| webSiteUrl      | YES                                         | Website URL                                                                                                | Length 0-254                              | http://www.mysite.com                                                        |
| firstName       | YES                                         | First name of the customer.                                                                                | Length 0-254                              | John                                                                         |
| lastName        | YES                                         | Las name of the customer.                                                                                  | Length 0-254                              | Smith                                                                        |
| phoneNumber     | YES                                         | Phone number, text value                                                                                   | Length 3-12                               | 2123123123                                                                   |
| address         | YES                                         | Customers address                                                                                          | Length 0-254                              | my address                                                                   |
| city            | NO                                          | City                                                                                                       | Length 0-254                              | Glendale                                                                     |
| state           | NO                                          | State                                                                                                      | Length 2                                  | CA                                                                           |
| zip             | YES                                         | 5-digit zip code, numeric value                                                                            | Length 5-8                                | 90210                                                                        |
| userIp          | YES                                         | IP of the customer.                                                                                        | Length 0-254                              | 64.60.147.1                                                                  |
| bestCallTime    | YES                                         | Best time to call the customer.                                                                            | Length 0-254                              | Anytime                                                                      |
| purchaseTimeFrame | YES                                         | Purchase Time Frame                                                                                        | One of the following: [`Immediately`, `Within_1_month`, `1-3_months`, `more_than_3_months`] | more_than_3_months                                                           |
| ownHome         | YES                                         | One of the following: [`YES`, `NO`]                                                                        | One of the following: [`NA`, `YES`, `NO`] | NO                                                                           |
| creditRating    | NO                                          | Any string value up to 254 symbols                                                                         | Length 0-254                              | excellent                                                                    |
| jobType         | YES                                         | Home Services job type.                                                                                    | One of the following: [`additions`, `bathroom`, `cabinets`, `deck`, `doors`, `electrical`, `fencing`, `flooring`, `garage_doors`, `gutters`, `handy_man`, `home_security`, `hvac`, `insulation`, `kitchen`, `landscaping`, `painting`, `pest_control`, `plumbing`, `remodeling`, `roof`, `siding`, `stair_lift`, `sunrooms`, `swimming_pool`, `trees`, `windows`] | roof                                                                         |
| ... (All subsequent fields are the same as in PING, but note which ones become YES for POST) ... |
| addition_type   | NO Unless (`@jobType` = "additions")        | Type of addition.                                                                                          | One of the following. [`Ground_floor`, `Second_floor`, `Other`] | Second floor                                                                 |
| bathroomProjectType | NO Unless (`@jobType` = "bathroom")         | Bathroom Project Type                                                                                      | One of the following. [`Bath_sinks`, `Full_bathroom`, `Tile`] | Tile                                                                         |
| cabinetsProjectType | NO Unless (`@jobType` = "cabinets")         | Cabinets Project Type                                                                                      | One of the following. [`Install_new_custom_cabinets`, `Install_new_pre-made_cabinets`, `Repair_existing_cabinets`, `Reface_existing_cabinets`] | Repair existing cabinets                                                     |
| deckMaterial    | NO Unless (`@jobType` = "deck")             | Material used for deck.                                                                                    | One of the following: [`Composite`, `Wood`, `Other`] | Wood                                                                         |
| doorProjectType | NO Unless (`@jobType` = "doors")            | Doors Project type                                                                                         | One of the following. [`New_installation`, `Repair`] | Repair                                                                       |
| doorsMaterial   | NO Unless (`@jobType` = "doors")            | Material used for the doors.                                                                               | One of the following. [`Wood`, `Metal`, `Composite`, `Other`] | Wood                                                                         |
| preHung         | NO Unless (`@jobType` = "doors")            | Is the door pre-hung?                                                                                      | One of the following: [`YES`,`NO`]        | YES                                                                          |
| electricalProjectType | NO Unless (`@jobType` = "electrical")     | Electrical project type.                                                                                   | One of the following: [`Install`, `Repair`] | Install                                                                      |
| electricalServiceType | NO Unless (`@jobType` = "electrical")     | Electrical Service Type                                                                                    | One of the following: [`Electric_for_home_addition_or_remodel`, `Electrical_wiring_or_panel_upgrade`, `Generator`, `Home_energy_audit`, `Low_voltage_wiring`, `Outdoor_lighting`] | Generator                                                                    |
| fenceType       | NO Unless (`@jobType` = "fencing")          | Fence Type                                                                                                 | One of the following: [`Wood`, `Metal`, `Composite`, `Electric`, `Other`] | Wood                                                                         |
| flooringInquiyType | NO Unless (`@jobType` = "flooring")        | The type of inquiry for flooring.                                                                          | One of the following: [`Installation`, `Repair`] | Repair                                                                       |
| flooringType    | NO Unless (`@jobType` = "flooring")        | Flooring Type                                                                                              | One of the following: [`Hardwood`, `Vinyl`, `Carpet`, `Tile`, `Composite`] | Hardwood                                                                     |
| garageDoorsProjectType | NO Unless (`@jobType` = "garage_doors") | Garage Project Type                                                                                        | One of the following: [`New_Construction`, `Replacement`] | Replacement                                                                  |
| numberOfDoors   | NO Unless (`@jobType` = "garage_doors") | Number of Garage Doors.                                                                                    | Length 1-200                              | 1                                                                            |
| carryWeight     | NO Unless (`@jobType` = "stair_lift")       | The weight the stair lift will carry.                                                                      | Numeric 0-300                             | 120                                                                          |
| homeSecurityBuildingType | NO Unless (`@jobType` = "home_security") | Building type you would need Home Security for.                                                            | One of the following: [`House`, `Condo_unit_or_apartment`, `Office`, `Large_building`, `Other`] | Office                                                                       |
| hvacAirType     | NO Unless (`@jobType` = "hvac")             | HVAC Air Type                                                                                              | One of the following: [`Cooling`, `Heating`, `Heating_and_cooling`] | Heating                                                                      |
| hvacProjectType | NO Unless (`@jobType` = "hvac")             | HVAC Project Type                                                                                          | One of the following: [`New_unit_installed`, `Repair`] | Repair                                                                       |
| hvacSystemType  | NO Unless (`@jobType` = "hvac")             | HVAC System Type                                                                                           | One of the following: [`Central_AC`, `Gas_boiler`, `Propane_boiler`, `Oil_boiler`, `Electric_boiler`, `Heat_pump`, `Water_heater`, `Gas_furnace`, `Propane_furnace`, `Oil_furnace`, `Electric_furnace`] | Central_AC                                                                   |
| insulationServiceType | NO Unless (`@jobType` = "insulation")     | Insulation Service Type                                                                                    | One of the following: [`Blown_in`, `Spray_foam`, `Batten`] | Batten                                                                       |
| kitchenProjectType | NO Unless (`@jobType` = "kitchen")          | Kitchen Project Type                                                                                       | One of the following: [`Floor_plan`, `Cabinets`, `Appliances`, `Counter_tops_or_sinks`, `Flooring`] | Flooring                                                                     |
| landscapingProjectType | NO Unless (`@jobType` = "landscaping")    | Landscaping Project Type                                                                                   | One of the Following: [`Landscaping`, `Lawn_Care`, `Sprinklers`] | Landscaping                                                                  |
| landscapingServiceType | NO Unless (`@jobType` = "landscaping")    | Landscaping Service Type                                                                                   | One of the following: [`Front_Yard`, `Back_Yard`] | Front_Yard                                                                   |
| numStairs       | NO Unless (`@jobType` = "stair_lift")       | Number of stairs that you have.                                                                            | Numeric 0-300                             | 5                                                                            |
| openers         | NO Unless (`@jobType` = "garage_doors") | Are openers present?                                                                                       | One of the following: [`YES`, `NO`]       | YES                                                                          |
| paintingProjectType | NO Unless (`@jobType` = "painting")       | Painting Project Type                                                                                      | One of the following: [`Exterior_Painting`, `Interior_Painting`, `Specialty_Painting_Faux_Finishes`, `Specialty_Painting_Textures`, `Other`] | Exterior_Painting                                                            |
| pestControlProjectType | NO Unless (`@jobType` = "pest_control")   | Pest Control Project Type                                                                                  | One of the following: [`Ant_Control`, `Bee_Removal`, `Small_animals`, `Termites`] | Ant_Control                                                                  |
| plumbingProjectType | NO Unless (`@jobType` = "plumbing")       | Plumbing Project Type                                                                                      | One of the following: [`Install`, `Repair`] | Install                                                                      |
| plumbingServiceType | NO Unless (`@jobType` = "plumbing")       | Plumbing Service Type                                                                                      | One of the following: [`Drain_cleaning`, `Install_or_repair_water_heater`, `Plumbing_work`, `Septic_install_or_replace`, `Septic_repair`, `Septic_clean_or_pump_out`, `Sewer_main`, `Well_pumps`, `Water_main`] | Drain_cleaning                                                               |
| poolType        | NO Unless (`@jobType` = "swimming_pool")  | Pool Type                                                                                                  | One of the following: [`Swimming_Pool`, `Sauna`, `Hot_Tub`] | Sauna                                                                        |
| protection      | NO Unless (`@jobType` = "gutter")           | Is gutter protection requested?                                                                            | One of the following: [`YES`, `NO`]       | YES                                                                          |
| remodelingLocationInHome | NO Unless (`@jobType` = "remodeling")   | The location you are going to need remodeling.                                                             | One of the following: [`Bathroom`, `Basement`, `Kitchen`] | Bathroom                                                                     |
| remodelingProjectType | NO Unless (`@jobType` = "remodeling")   | Remodeling Project Type                                                                                    | One of the following: [`Multiple_Rooms`, `Single_Room`] | Multiple_Rooms                                                               |
| roofProjectType | NO Unless (`@jobType` = "roof")             | Roof Project type                                                                                          | One of the following: [`New_roof_for_new_home`, `New_roof_for_an_existing_home`, `Repair`, `Shingle_over_existing_roof`] | Repair                                                                       |
| roofingType     | NO Unless (`@jobType` = "roof")             | Roofing Type                                                                                               | One of the following: [`Asphalt_shingle`, `Cedar_shake`, `Metal`, `Tar`, `Tile`, `Natural_state`] | Metal                                                                        |
| sidingProjectType | NO Unless (`@jobType` = "siding")         | Siding Project Type                                                                                        | One of the following: [`Replace_siding`, `Siding_repair`] | Siding_repair                                                                |
| sidingType      | NO Unless (`@jobType` = "siding")         | Siding Type                                                                                                | One of the following: [`Vinyl`, `Wood`, `Metal`, `Stucco`, `Brick_or_stone`, `Other`] | Metal                                                                        |
| stairLiftProjectType | NO Unless (`@jobType` = "stair_lift")     | Stair Lift Project Type                                                                                    | One of the following: [`Private`, `Public`] | Private                                                                      |
| stairLiftStairType | NO Unless (`@jobType` = "stair_lift")     | The stair type that you will be needing the stair lift for.                                                | One of the following: [`Straight_staircase`, `Curved_staircase`] | Straight_staircase                                                           |
| sunroomNumRooms | NO Unless (`@jobType` = "sunroom")          | Number of rooms for the sunroom.                                                                           | Numeric 0-300                             | 2                                                                            |
| sunroomLength   | NO Unless (`@jobType` = "sunroom")          | Length of the sunroom.                                                                                     | Numeric 0-300                             | 43                                                                           |
| sunroomWidth    | NO Unless (`@jobType` = "sunroom")          | Width of the sunroom.                                                                                      | Numeric 0-300                             | 30                                                                           |
| swimmingPoolProjectType | NO Unless (`@jobType` = "swimming_pool") | Swimming Pool Project Type                                                                               | One of the following: [`Indoor`, `Outdoor`] | Indoor                                                                       |
| swimmingPoolServiceType | NO Unless (`@jobType` = "swimming_pool") | Swimming Pool Service Type                                                                               | One of the following: [`Repair`, `Install`] | Repair                                                                       |
| treesProjectType | NO Unless (`@jobType` = "trees")           | Trees Project Type                                                                                         | One of the following: [`Trees`, `Shrubs`, `Stump_removal`] | Shrubs                                                                       |
| windowsProjectType | NO Unless (`@jobType` = "windows")        | Windows Project Type                                                                                       | One of the following: [`Interested_in_replacement_windows`, `Need_repair_services_at_this_time`, `Need_repair_but_interested_in_new_windows`] | Interested_in_replacement_windows                                            |
| numberOfWindows | NO Unless (`@jobType` = "windows")        | Number of windows                                                                                          | String                                    | 4                                                                            |
| creditScore     | YES                                         |                                                                                                            |                                           |                                                                              |
| testMode        | NO                                          | 1 to enable test mode. DO NOT send this parameter at all when sending live leads.                          | Integer                                   | 1                                                                            |
| clickid         | NO                                          | The data from this field is not stored anywhere in our system. It will only be used to pass as an additional parameter in buyer integrations and pixel tracking. This parameter can be seen in lead details and can be used for outbound API posting or to Fire a Pixel. | String                                    | XXX871CF-333E-4B97-A1A3-3C921A61EXXX                                         |
| tPar            | NO                                          | Additional parameter that can be used to pass fields that are not in the product. The data from this field is not stored anywhere in our system thus data passed in tPar can not be filtered. It will only be used to pass as an additional parameter in buyer integrations and pixel tracking. | Array                                     | tPar[affiliateId]=123&tPar[affiliateSubId]=123_444&tPar[transactionId]=123456&tPar[offerId]=offer-2234 |
| source          | NO                                          | Option to post either website name or affiliate source (subID). Website name needs to be in the format specified in the example. SubID can be any alphanumeric symbol, in any format. This field should not be unique. This parameter can be seen in lead details and can be used for outbound API posting or to Fire a Pixel. | String                                    | http://webiste.xxx                                                           |

## 3.3 Full Post
**Posting Url:**
`https://leads-inst523-client.phonexa.com/fullpost/`

| Field Name      | Required                                    | Description                                                                                                | Format                                    | Example                                                                      |
|-----------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------|-------------------------------------------|------------------------------------------------------------------------------|
| apiId           | YES                                         | Your API authentication ID: **BEB36867357C435CA9FE69AACB4D9909** (should be unique to each channel)          | Length 1-64                               | myusername                                                                   |
| apiPassword     | YES                                         | Your API authentication password: **00c1e7396**                                                            | String                                    |                                                                              |
| productId       | YES                                         | Please set this value to 267                                                                               | Integer                                   | 267                                                                          |
| price           | YES                                         | The minimum price the lead should be sold for. Leave blank or 0 for any price.                             | Decimal                                   | 0.01                                                                         |
| email           | YES                                         | Email address, text value                                                                                  | Length 5-128                              | john.n@yahoo.com                                                             |
| tcpa            | YES                                         | Is lead TCPA compliant?                                                                                    | One of the following: [`NA`, `YES`, `NO`] | NA                                                                           |
| tcpaLanguage    | YES                                         | TCPA Consent Text                                                                                          | Length 0-4000                             | Agreement text                                                               |
| userAgent       | YES                                         | HTTP_USER_AGENT string of the customer's web browser.                                                      | Length 0-254                              | Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)      |
| jornayaLeadId   | NO                                          | Jornaya Lead Id                                                                                            | Length 1-255                              | 0F0F0F0F-0F0F-0F0F-0F0F-0F0F0F0F0F0F                                         |
| trustedFormURL  | NO                                          | Trusted Form Certificate URL                                                                               | Length 1-255                              | https://cert.trustedform.com/0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f/          |
| webSiteUrl      | YES                                         | Website URL                                                                                                | Length 0-254                              | http://www.mysite.com                                                        |
| firstName       | YES                                         | First name of the customer.                                                                                | Length 0-254                              | John                                                                         |
| lastName        | YES                                         | Las name of the customer.                                                                                  | Length 0-254                              | Smith                                                                        |
| phoneNumber     | YES                                         | Phone number, text value                                                                                   | Length 3-12                               | 2123123123                                                                   |
| address         | YES                                         | Customers address                                                                                          | Length 0-254                              | my address                                                                   |
| city            | NO                                          | City                                                                                                       | Length 0-254                              | Glendale                                                                     |
| state           | NO                                          | State                                                                                                      | Length 2                                  | CA                                                                           |
| zip             | YES                                         | 5-digit zip code, numeric value                                                                            | Length 5-8                                | 90210                                                                        |
| userIp          | YES                                         | IP of the customer.                                                                                        | Length 0-254                              | 64.60.147.1                                                                  |
| bestCallTime    | YES                                         | Best time to call the customer.                                                                            | Length 0-254                              | Anytime                                                                      |
| purchaseTimeFrame | YES                                         | Purchase Time Frame                                                                                        | One of the following: [`Immediately`, `Within_1_month`, `1-3_months`, `more_than_3_months`] | more_than_3_months                                                           |
| ownHome         | YES                                         | One of the following: [`YES`, `NO`]                                                                        | One of the following: [`NA`, `YES`, `NO`] | NO                                                                           |
| creditRating    | NO                                          | Any string value up to 254 symbols                                                                         | Length 0-254                              | excellent                                                                    |
| jobType         | YES                                         | Home Services job type.                                                                                    | One of the following: [`additions`, `bathroom`, `cabinets`, `deck`, `doors`, `electrical`, `fencing`, `flooring`, `garage_doors`, `gutters`, `handy_man`, `home_security`, `hvac`, `insulation`, `kitchen`, `landscaping`, `painting`, `pest_control`, `plumbing`, `remodeling`, `roof`, `siding`, `stair_lift`, `sunrooms`, `swimming_pool`, `trees`, `windows`] | roof                                                                         |
| ... (All subsequent fields are the same as in POST, which are largely the same as PING with varied 'Required' status) ... |
| creditScore     | YES                                         |                                                                                                            |                                           |                                                                              |
| testMode        | NO                                          | 1 to enable test mode. DO NOT send this parameter at all when sending live leads.                          | Integer                                   | 1                                                                            |
| clickid         | NO                                          | The data from this field is not stored anywhere in our system. It will only be used to pass as an additional parameter in buyer integrations and pixel tracking. This parameter can be seen in lead details and can be used for outbound API posting or to Fire a Pixel. | String                                    | XXX871CF-333E-4B97-A1A3-3C921A61EXXX                                         |
| tPar            | NO                                          | Additional parameter that can be used to pass fields that are not in the product. The data from this field is not stored anywhere in our system thus data passed in tPar can not be filtered. It will only be used to pass as an additional parameter in buyer integrations and pixel tracking. | Array                                     | tPar[affiliateId]=123&tPar[affiliateSubId]=123_444&tPar[transactionId]=123456&tPar[offerId]=offer-2234 |
| source          | NO                                          | Option to post either website name or affiliate source (subID). Website name needs to be in the format specified in the example. SubID can be any alphanumeric symbol, in any format. This field should not be unique. This parameter can be seen in lead details and can be used for outbound API posting or to Fire a Pixel. | String                                    | http://webiste.xxx                                                           |

# 4. Sample Code
Use either **PING + POST** strategy, or **Full Post** strategy

PING POST OMMITTED FOR BREVITY.

## 4.3 Full Post
*(Code examples for Full Post would be very similar to POST, just changing the `$server_url` / `server_url` / `urlStr` to `.../fullpost/` and ensuring the `price` field is included. The `promise` field is NOT sent for Full Post.)*

EXAMPLE CODE OMITTED (PHP / PYTHON / BASH / JAVA -- NOT APPLICABLE)

# 5. Response Samples

## 5.1 Ping Accept Response
```json
{
  "status": "continue",
  "price": 20,
  "promise": "W_ERY60"
}
```

## 5.2 Ping Reject Response
```json
{
  "status": "reject",
  "reason": "No buyer found."
}
```

## 5.3 Sold Lead (Accepted Customer from Lead Generator)
```json
{
  "lead_id": "W_0000",
  "status": 1,
  "status_text": "sold",
  "redirect_url": "https://leads-inst523-client.phonexa.com/redirect?id=a5bfc9e07964f8dddeb95fc584cd965d",
  "price": "1.0000",
  "timestamp": 1464879427.2253,
  "processing_time": 0.0475
}
```

## 5.4 Reject Lead (Rejected Customer from Lead Generator)
```json
{
  "lead_id": "23",
  "status": 2,
  "status_text": "reject",
  "timestamp": 1464871644,
  "processing_time": 0.0105
}
```

## 5.5 Price Reject*
```json
{
  "lead_id": "23",
  "status": 2,
  "status_text": "reject",
  "price_reject": 3.5,
  "timestamp": 1464871644,
  "processing_time": 0.0105
}
```
*\*Note: The document doesn't explicitly define "Price Reject" behavior for PING. This example might be for POST/FullPost.*

## 5.6 Error
```json
{
  "status": 4,
  "errors": [
    {
      "loanAmount": "required",
      "firstName": "required"
    }
  ]
}
```

# 6. The Intermittent Lead Status Query
This method reduces the consumption of resources when processing leads and increases stability by eliminating the need to maintain uninterrupted connection between servers for an extended period of time.

**Method pros:**
*   Reduces reliance on prolonged connection which is especially valuable in mobile apps (background processing) and cases of low-quality internet connection.
*   Decreases the common load on the system due to reduced connection time between client and server.
*   Retrieval of lead status may become available even after processing is complete and the client has abandoned the page. In this case a redirect link may be provided to the client through another channel (ex: push notification, SMS, email).

Implementing this method results in an increase of successful redirects as well as improved traffic quality.

**General work algorithm:**
*   Add parameter `closeConnection=1` with the rest of the lead parameters. After the system receives data, the connection will be closed but the lead will be processed in the background. In the JSON response, you will receive the `"lead_id"` parameter.
*   System will send an intermittent query per specified time intervals to get lead result using the following request: `https://leads-inst523-client.phonexa.com/lead/check-lead-status?apiId={apiId}&apiPassword={apiPassword}&checkKey={lead_id}`.

**Recommended incremental ping time intervals:**
*   0-10 seconds: query every second since the majority of sold leads have a status within the first 10 seconds.
*   11-30 seconds: intermittent queries can be made every 2 seconds.
*   31-60 seconds: query frequency reduced to once every 3 seconds.
*   61 seconds and above: query frequency can further be reduced down to once every 5 seconds to maintain efficiency of the processing method.
*   Set a maximum processing time limit (ex: 300 seconds). If lead surpasses threshold, then the lead has not sold.

**Response examples:**

## 6.1 Sold
```json
{
  "status": 1,
  "status_text": "sold",
  "redirect_url": "https://leads.system.com/redirect?id=81649f87d4e596a711d449970392ed67"
}
```

## 6.2 Reject
```json
{
  "status": 2,
  "status_text": "reject"
}
```

## 6.3 In Progress
```json
{
  "status": 3,
  "status_text": "In Progress"
}
```

## 6.4 Authorization Failed
```json
{
  "status": 4,
  "errors": [
    {
      "Authorization Failed": ""
    }
  ]
}
```

## 6.5 Not Found
```json
{
  "status": 5,
  "errors": [
    {
      "Not Found": ""
    }
  ]
}
```

# 7. Test Mode
For testing Reject, please use the same live credentials but add **testMode=1** in parameter list.
For testing Sold, use the same live credentials but add **testMode=1** and **testSold=1** in parameter list.
**WARNING:** make sure to remove it once you are done testing and start sending live leads.
```
