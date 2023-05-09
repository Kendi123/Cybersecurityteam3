// Define the Instagram post selector
const instagramPostSelector = "article a";

// Define the URLScan.io API endpoint and headers
const urlscanApiEndpoint = "https://urlscan.io/api/v1/scan/";
const urlscanApiHeaders = {
  "Content-Type": "application/json"
};

// Define the URLScan.io result endpoint
const urlscanResultEndpoint = "https://urlscan.io/api/v1/result/";

// Define the function to scan a URL with URLScan.io
async function scanUrlWithUrlscan(url) {
  // Define the request payload
  const requestPayload = {
    url: url,
    public: "on"
  };
  
  // Send the request to URLScan.io
  const response = await fetch(urlscanApiEndpoint, {
    method: "POST",
    headers: urlscanApiHeaders,
    body: JSON.stringify(requestPayload)
  });
  
  // Parse the response into a JSON object
  const responseData = await response.json();
  
  // Extract the URLScan.io scan ID
  const urlscanScanId = responseData.uuid;
  
  return urlscanScanId;
}

// Define the function to get the scan results from URLScan.io
async function getScanResultsFromUrlscan(scanId) {
  // Define the URL for the scan results
  const scanResultsUrl = urlscanResultEndpoint + scanId + "/";
  
  // Send the request to URLScan.io
  const response = await fetch(scanResultsUrl);
  
  // Parse the response into a JSON object
  const responseData = await response.json();
  
  return responseData;
}

// Define the function to extract links from Instagram posts
function extractLinksFromInstagramPosts() {
  // Get all the Instagram post links
  const instagramPostLinks = Array.from(document.querySelectorAll(instagramPostSelector))
    .map(linkElement => linkElement.getAttribute("href"))
    .filter(href => href && href.startsWith("https://"));
  
  return instagramPostLinks;
}

// Define the function to scan all links and display the results
async function scanAllLinks() {
  // Extract all links from Instagram posts
  const linksToScan = extractLinksFromInstagramPosts();
  
  // Scan each link and display the results
  for (const link of linksToScan) {
    const scanId = await scanUrlWithUrlscan(link);
    const scanResults = await getScanResultsFromUrlscan(scanId);
    console.log(scanResults);
  }
}

// Call the function to start scanning links
scanAllLinks();
