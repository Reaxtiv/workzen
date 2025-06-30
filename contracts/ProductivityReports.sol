// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductivityReports {
    struct DailyReport {
        address employee;
        uint256 date;
        uint256 productivityScore;
        uint256 activeTime;        // en segundos
        uint256 focusTime;         // en segundos
        uint256 webProductivityScore;
        uint256 breaksCount;
        bytes32 dataHash;          // Hash de los datos completos
        uint256 timestamp;
    }
    
    // Mapeo de empleado -> array de reportes
    mapping(address => DailyReport[]) public employeeReports;
    
    // Mapeo de fecha -> empleado -> reporte
    mapping(uint256 => mapping(address => DailyReport)) public dailyReports;
    
    // Solo la empresa puede enviar reportes
    address public company;
    
    event ReportSubmitted(
        address indexed employee,
        uint256 indexed date,
        uint256 productivityScore,
        bytes32 dataHash
    );
    
    constructor() {
        company = msg.sender;
    }
    
    modifier onlyCompany() {
        require(msg.sender == company, "Only company can submit reports");
        _;
    }
    
    /**
     * @dev Enviar reporte diario a blockchain (SOLO DATOS, NO TOKENS)
     */
    function submitDailyReport(
        address employee,
        uint256 date,
        uint256 productivityScore,
        uint256 activeTime,
        uint256 focusTime,
        uint256 webProductivityScore,
        uint256 breaksCount,
        bytes32 dataHash
    ) external onlyCompany {
        require(employee != address(0), "Invalid employee address");
        require(productivityScore <= 100, "Invalid productivity score");
        require(date > 0, "Invalid date");
        
        // Crear el reporte
        DailyReport memory report = DailyReport({
            employee: employee,
            date: date,
            productivityScore: productivityScore,
            activeTime: activeTime,
            focusTime: focusTime,
            webProductivityScore: webProductivityScore,
            breaksCount: breaksCount,
            dataHash: dataHash,
            timestamp: block.timestamp
        });
        
        // Guardar en ambos mapeos para acceso eficiente
        employeeReports[employee].push(report);
        dailyReports[date][employee] = report;
        
        emit ReportSubmitted(employee, date, productivityScore, dataHash);
    }
    
    /**
     * @dev Obtener número total de reportes de un empleado
     */
    function getEmployeeReportCount(address employee) external view returns (uint256) {
        return employeeReports[employee].length;
    }
    
    /**
     * @dev Obtener reporte específico de un empleado por índice
     */
    function getEmployeeReport(address employee, uint256 index) 
        external view returns (DailyReport memory) {
        require(index < employeeReports[employee].length, "Report index out of bounds");
        return employeeReports[employee][index];
    }
    
    /**
     * @dev Obtener reporte de una fecha específica
     */
    function getDailyReport(uint256 date, address employee) 
        external view returns (DailyReport memory) {
        return dailyReports[date][employee];
    }
    
    /**
     * @dev Verificar si existe un reporte para una fecha específica
     */
    function hasReportForDate(uint256 date, address employee) 
        external view returns (bool) {
        return dailyReports[date][employee].timestamp > 0;
    }
    
    /**
     * @dev Obtener estadísticas generales de un empleado
     */
    function getEmployeeStats(address employee) 
        external view returns (
            uint256 totalReports,
            uint256 averageProductivity,
            uint256 totalActiveTime,
            uint256 totalFocusTime
        ) {
        DailyReport[] memory reports = employeeReports[employee];
        totalReports = reports.length;
        
        if (totalReports == 0) {
            return (0, 0, 0, 0);
        }
        
        uint256 totalProductivity = 0;
        uint256 sumActiveTime = 0;
        uint256 sumFocusTime = 0;
        
        for (uint256 i = 0; i < totalReports; i++) {
            totalProductivity += reports[i].productivityScore;
            sumActiveTime += reports[i].activeTime;
            sumFocusTime += reports[i].focusTime;
        }
        
        averageProductivity = totalProductivity / totalReports;
        totalActiveTime = sumActiveTime;
        totalFocusTime = sumFocusTime;
    }
}
