import requestIp from "request-ip"

export const getClientIp = (req,res,next)=>{
    let ip = requestIp.getClientIp(req);
    // Optional: convert IPv6 loopback (::1) or IPv4-mapped IPv6 (::ffff:127.0.0.1) to clean IPv4
    if (ip?.includes("::ffff:")) {
      ip = ip.split("::ffff:")[1];
    } 
    else if (ip === "::1") {
      ip = "127.0.0.1";      
    }
  
    req.clientIp = ip; // Attach IP to request
    next();
}