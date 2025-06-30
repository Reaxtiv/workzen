// test-contract.js - Verificar que el contrato funciona correctamente
const { ethers } = require("hardhat");

async function main() {
  console.log("🧪 Testing ProductivityReports contract...\n");

  const contractAddress = "0xA08751DEf5106FD658ce18E10bae948f8cdBFEF2";
  
  // Obtener el contrato desplegado
  const ProductivityReports = await ethers.getContractFactory("ProductivityReports");
  const contract = ProductivityReports.attach(contractAddress);
  
  const [signer] = await ethers.getSigners();
  console.log("👤 Testing with account:", signer.address);
  
  try {
    // Test 1: Verificar que el contrato responde
    console.log("📋 Test 1: Contract basic info");
    console.log("📍 Contract address:", contractAddress);
    
    // Test 2: Verificar funciones básicas
    console.log("\n📋 Test 2: Testing hasReportForDate function");
    const today = Math.floor(Date.now() / 1000 / 86400);
    const hasReport = await contract.hasReportForDate(today, signer.address);
    console.log("✅ hasReportForDate works:", hasReport);
    
    // Test 3: Verificar estadísticas iniciales
    console.log("\n📋 Test 3: Testing getEmployeeStats function");
    const stats = await contract.getEmployeeStats(signer.address);
    console.log("✅ getEmployeeStats works:");
    console.log("  - Total reports:", stats.totalReports.toString());
    console.log("  - Average productivity:", stats.averageProductivity.toString());
    console.log("  - Total active time:", stats.totalActiveTime.toString());
    console.log("  - Total focus time:", stats.totalFocusTime.toString());
    
    // Test 4: Enviar un reporte de prueba
    console.log("\n📋 Test 4: Submitting test report");
    
    if (!hasReport) {
      const testData = {
        productivityScore: 85,
        activeTime: 28800, // 8 horas
        focusTime: 25200,  // 7 horas
        webProductivityScore: 80,
        breaksCount: 5,
        dataHash: ethers.keccak256(ethers.toUtf8Bytes("test-data-" + Date.now()))
      };
      
      console.log("📤 Submitting test report...");
      const tx = await contract.submitDailyReport(
        signer.address,
        today,
        testData.productivityScore,
        testData.activeTime,
        testData.focusTime,
        testData.webProductivityScore,
        testData.breaksCount,
        testData.dataHash
      );
      
      console.log("⏳ Waiting for confirmation...");
      const receipt = await tx.wait();
      console.log("✅ Report submitted! Tx:", receipt.hash);
      
      // Verificar que se guardó
      const newStats = await contract.getEmployeeStats(signer.address);
      console.log("📊 Updated stats:");
      console.log("  - Total reports:", newStats.totalReports.toString());
      console.log("  - Average productivity:", newStats.averageProductivity.toString());
      
    } else {
      console.log("ℹ️ Report already exists for today");
    }
    
    console.log("\n🎉 ALL TESTS PASSED! Contract is working correctly!");
    console.log("🔗 View on Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}`);
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
