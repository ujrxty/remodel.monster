import { NextResponse } from "next/server";

/**
 * Handle POST requests to the API endpoint
 * Generated from offer configuration
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} The response object
 */
export async function POST(request) {
  const formData = await request.json();

  const userIp = request.headers.get("X-Forwarded-For");
  const clientIp = userIp
    ? userIp.split(",")[0].trim()
    : request.socket.remoteAddress;
  
  /**
   * Normalize IP address format
   * @param {string} ip - The IP address to normalize
   * @returns {string} The normalized IP address
   */
  const normalizeIp = (ip) =>
    ip.includes("::ffff:") ? ip.split("::ffff:")[1] : ip;
  
  const finalIp = normalizeIp(clientIp);
  
  // Get user agent
  const userAgent = request.headers.get("User-Agent") || "";

  // Create API request body from configuration mappings
  const jsonBody = {
    apiId: "BEB36867357C435CA9FE69AACB4D9909",
    apiPassword: "00c1e7396",
    productId: 267,
    userIp: finalIp,
    userAgent: userAgent,
    webSiteUrl: "homeimprovement.online",
    bestCallTime: formData.bestCallTime || 'Anytime',
    price: 0.01, // Required for fullpost endpoint
    // API spec required fields with proper mapping
    
    firstName: formData.firstName,
      
    lastName: formData.lastName,
      
    email: formData.email,
      
    phoneNumber: formData.phoneNumber,
      
    address: formData.address,
      
    city: formData.city,
      
    state: formData.state,
      
    zip: formData.zip,
      
    jobType: formData.jobType,
      
    purchaseTimeFrame: formData.purchaseTimeFrame,
      
    ownHome: formData.ownHome,
      
    creditRating: formData.creditRating,
      
    
    // Add job-specific fields dynamically
    
    ...(formData.addition_type ? { addition_type: formData.addition_type } : {}),
    
    ...(formData.bathroomProjectType ? { bathroomProjectType: formData.bathroomProjectType } : {}),
    
    ...(formData.cabinetsProjectType ? { cabinetsProjectType: formData.cabinetsProjectType } : {}),
    
    ...(formData.deckMaterial ? { deckMaterial: formData.deckMaterial } : {}),
    
    ...(formData.doorProjectType ? { doorProjectType: formData.doorProjectType } : {}),
    
    ...(formData.doorsMaterial ? { doorsMaterial: formData.doorsMaterial } : {}),
    
    ...(formData.preHung ? { preHung: formData.preHung } : {}),
    
    ...(formData.electricalProjectType ? { electricalProjectType: formData.electricalProjectType } : {}),
    
    ...(formData.electricalServiceType ? { electricalServiceType: formData.electricalServiceType } : {}),
    
    ...(formData.fenceType ? { fenceType: formData.fenceType } : {}),
    
    ...(formData.flooringInquiyType ? { flooringInquiyType: formData.flooringInquiyType } : {}),
    
    ...(formData.flooringType ? { flooringType: formData.flooringType } : {}),
    
    ...(formData.garageDoorsProjectType ? { garageDoorsProjectType: formData.garageDoorsProjectType } : {}),
    
    ...(formData.numberOfDoors ? { numberOfDoors: formData.numberOfDoors } : {}),
    
    ...(formData.carryWeight ? { carryWeight: formData.carryWeight } : {}),
    
    ...(formData.homeSecurityBuildingType ? { homeSecurityBuildingType: formData.homeSecurityBuildingType } : {}),
    
    ...(formData.hvacAirType ? { hvacAirType: formData.hvacAirType } : {}),
    
    ...(formData.hvacProjectType ? { hvacProjectType: formData.hvacProjectType } : {}),
    
    ...(formData.hvacSystemType ? { hvacSystemType: formData.hvacSystemType } : {}),
    
    ...(formData.insulationServiceType ? { insulationServiceType: formData.insulationServiceType } : {}),
    
    ...(formData.kitchenProjectType ? { kitchenProjectType: formData.kitchenProjectType } : {}),
    
    ...(formData.landscapingProjectType ? { landscapingProjectType: formData.landscapingProjectType } : {}),
    
    ...(formData.landscapingServiceType ? { landscapingServiceType: formData.landscapingServiceType } : {}),
    
    ...(formData.numStairs ? { numStairs: formData.numStairs } : {}),
    
    ...(formData.openers ? { openers: formData.openers } : {}),
    
    ...(formData.paintingProjectType ? { paintingProjectType: formData.paintingProjectType } : {}),
    
    ...(formData.pestControlProjectType ? { pestControlProjectType: formData.pestControlProjectType } : {}),
    
    ...(formData.plumbingProjectType ? { plumbingProjectType: formData.plumbingProjectType } : {}),
    
    ...(formData.plumbingServiceType ? { plumbingServiceType: formData.plumbingServiceType } : {}),
    
    ...(formData.poolType ? { poolType: formData.poolType } : {}),
    
    ...(formData.protection ? { protection: formData.protection } : {}),
    
    ...(formData.remodelingLocationInHome ? { remodelingLocationInHome: formData.remodelingLocationInHome } : {}),
    
    ...(formData.remodelingProjectType ? { remodelingProjectType: formData.remodelingProjectType } : {}),
    
    ...(formData.roofProjectType ? { roofProjectType: formData.roofProjectType } : {}),
    
    ...(formData.roofingType ? { roofingType: formData.roofingType } : {}),
    
    ...(formData.sidingProjectType ? { sidingProjectType: formData.sidingProjectType } : {}),
    
    ...(formData.sidingType ? { sidingType: formData.sidingType } : {}),
    
    ...(formData.stairLiftProjectType ? { stairLiftProjectType: formData.stairLiftProjectType } : {}),
    
    ...(formData.stairLiftStairType ? { stairLiftStairType: formData.stairLiftStairType } : {}),
    
    ...(formData.sunroomNumRooms ? { sunroomNumRooms: formData.sunroomNumRooms } : {}),
    
    ...(formData.sunroomLength ? { sunroomLength: formData.sunroomLength } : {}),
    
    ...(formData.sunroomWidth ? { sunroomWidth: formData.sunroomWidth } : {}),
    
    ...(formData.swimmingPoolProjectType ? { swimmingPoolProjectType: formData.swimmingPoolProjectType } : {}),
    
    ...(formData.swimmingPoolServiceType ? { swimmingPoolServiceType: formData.swimmingPoolServiceType } : {}),
    
    ...(formData.treesProjectType ? { treesProjectType: formData.treesProjectType } : {}),
    
    ...(formData.windowsProjectType ? { windowsProjectType: formData.windowsProjectType } : {}),
    
    ...(formData.numberOfWindows ? { numberOfWindows: formData.numberOfWindows } : {}),
    
    
    // Default values for required fields
    tcpa: formData.tcpa === "true" || formData.tcpa === true ? "YES" : "NO",
    tcpaLanguage: formData.tcpaLanguage || "By submitting this form, I agree to receive phone calls and text messages from this company and its partners.",
    
    // Pass through tracking parameters
    ...(formData.transaction_id ? { clickid: formData.transaction_id } : {}),
    ...(formData.source ? { source: formData.source } : {}),
    
    // Add test mode if specified
    ...(formData.testMode ? { testMode: formData.testMode } : {}),
    ...(formData.testSold ? { testSold: formData.testSold } : {}),
  };

  try {
    // Log the request for debugging (remove in production)
    console.log("API Request:", {
      url: "https://leads-inst523-client.phonexa.com/fullpost/",
      method: "POST",
      body: JSON.stringify(jsonBody)
    });

    // Send the request to the API
    const response = await fetch("https://leads-inst523-client.phonexa.com/fullpost/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonBody),
    });

    // Parse the response
    const data = await response.json();

    // Log the response (remove in production)
    console.log("API Response:", data);

    // Return the response
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("API Error:", error);
    
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to submit form",
        error: error.message,
      },
      { status: 500 }
    );
  }
}