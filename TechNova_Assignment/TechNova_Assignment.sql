DROP DATABASE IF EXISTS TechNovaDB;
CREATE DATABASE TechNovaDB;
USE TechNovaDB;

CREATE TABLE Department (
  DeptID INT PRIMARY KEY,
  DeptName VARCHAR(100) NOT NULL UNIQUE,
  Location VARCHAR(100)
);

CREATE TABLE Employee (
  EmpID INT PRIMARY KEY,
  EmpName VARCHAR(150) NOT NULL,
  Gender ENUM('M','F','O'),
  DOB DATE,
  HireDate DATE,
  DeptID INT,
  CONSTRAINT fk_emp_dept FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Project (
  ProjectID INT PRIMARY KEY,
  ProjectName VARCHAR(150) NOT NULL,
  DeptID INT,
  StartDate DATE,
  EndDate DATE,
  CONSTRAINT fk_proj_dept FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Performance (
  EmpID INT,
  ProjectID INT,
  Rating DECIMAL(3,2) NOT NULL, 
  ReviewDate DATE,
  PRIMARY KEY (EmpID, ProjectID, ReviewDate),
  CONSTRAINT fk_perf_emp FOREIGN KEY (EmpID) REFERENCES Employee(EmpID),
  CONSTRAINT fk_perf_proj FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

CREATE TABLE Reward (
  EmpID INT,
  RewardMonth DATE, 
  RewardAmount DECIMAL(10,2),
  PRIMARY KEY (EmpID, RewardMonth),
  CONSTRAINT fk_reward_emp FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);

CREATE INDEX idx_employee_name ON Employee(EmpName);
CREATE INDEX idx_employee_dept ON Employee(DeptID);

INSERT INTO Department VALUES
(101,'IT','Bangalore'),
(102,'HR','Delhi'),
(103,'Finance','Mumbai'),
(104,'Sales','Hyderabad'),
(105,'R&D','Pune');

INSERT INTO Employee VALUES
(1,'Asha','F','1990-07-12','2018-06-10',101),
(2,'Raj','M','1988-04-09','2020-03-22',102),
(3,'Neha','F','1995-01-15','2021-08-05',101),
(4,'Vikram','M','1992-11-02','2019-10-01',103),
(5,'Priya','F','1993-05-20','2022-02-15',104);

INSERT INTO Project VALUES
(1001,'Platform Revamp',101,'2019-01-01','2020-12-31'),
(1002,'Recruitment Drive',102,'2020-02-01','2020-08-31'),
(1003,'Tax Automation',103,'2021-03-01','2022-03-31'),
(1004,'Sales Portal',104,'2022-05-01',NULL),
(1005,'AI Research',105,'2023-01-01',NULL);

INSERT INTO Performance VALUES
(1,1001,4.5,'2019-12-20'),
(2,1002,3.8,'2020-07-15'),
(3,1001,4.2,'2021-09-10'),
(4,1003,4.7,'2021-12-05'),
(5,1004,3.9,'2022-11-01');

INSERT INTO Reward VALUES
(1,'2023-03-01',2500.00),
(2,'2023-06-01',1500.00),
(3,'2023-07-01',2200.00),
(4,'2022-12-01',800.00),   
(5,'2023-09-01',3000.00);

-- Update one employee's department
UPDATE Employee SET DeptID = 105 WHERE EmpID = 2;

-- Delete reward records where amount < 1000
DELETE FROM Reward WHERE RewardAmount < 1000;

SELECT * FROM Employee WHERE HireDate > '2019-01-01';

SELECT d.DeptName, AVG(p.Rating) AS AvgRating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
GROUP BY d.DeptID, d.DeptName;

SELECT EmpID, EmpName, DOB, TIMESTAMPDIFF(YEAR, DOB, CURDATE()) AS Age FROM Employee;

SELECT SUM(RewardAmount) AS TotalRewardsThisYear
FROM Reward
WHERE YEAR(RewardMonth) = YEAR(CURDATE());

SELECT r.EmpID, e.EmpName, r.RewardMonth, r.RewardAmount
FROM Reward r
JOIN Employee e ON r.EmpID = e.EmpID
WHERE r.RewardAmount > 2000;

-- --------------------------------------------------
-- Advanced queries (joins & subqueries) - User Story 4
-- 1) Highest-rated employee in each department
-- --------------------------------------------------

SELECT d.DeptName, t.EmpID, t.EmpName, t.MaxRating
FROM (
  SELECT e.DeptID, p.EmpID, e.EmpName, MAX(p.Rating) AS MaxRating
  FROM Performance p
  JOIN Employee e ON p.EmpID = e.EmpID
  GROUP BY e.DeptID, p.EmpID, e.EmpName
) t
JOIN Department d ON t.DeptID = d.DeptID
WHERE t.MaxRating = (
  SELECT MAX(pp.Rating)
  FROM Performance pp
  JOIN Employee ee ON pp.EmpID = ee.EmpID
  WHERE ee.DeptID = t.DeptID
);

-- 2) Employees who have not received any rewards
SELECT e.EmpID, e.EmpName
FROM Employee e
LEFT JOIN Reward r ON e.EmpID = r.EmpID
WHERE r.EmpID IS NULL;


-- --------------------------------------------------
-- Transaction control example (User Story 5)
-- This procedure inserts a new employee and a performance record
-- If any insert fails, the handler rolls back the transaction.
-- To test: run the CREATE PROCEDURE block once (it is idempotent when using DROP IF EXISTS),
-- then CALL the procedure. If you re-run the CALL, you may get a PK conflict.
-- --------------------------------------------------

DROP PROCEDURE IF EXISTS InsertEmployeeWithPerformance;
DELIMITER $$
CREATE PROCEDURE InsertEmployeeWithPerformance()
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    
    ROLLBACK;
    SELECT 'TRANSACTION_ROLLED_BACK' AS TransactionStatus;
  END;

  START TRANSACTION;
    
    INSERT INTO Employee (EmpID, EmpName, Gender, DOB, HireDate, DeptID)
      VALUES (99,'TestUser','O','1998-01-01','2023-10-01',101);

    INSERT INTO Performance (EmpID, ProjectID, Rating, ReviewDate)
      VALUES (99,1001,4.0,'2023-10-15');

  COMMIT;
  SELECT 'TRANSACTION_COMMITTED' AS TransactionStatus;
END$$
DELIMITER ;


-- --------------------------------------------------
-- Bonus: View and Stored Procedure (optional)
-- --------------------------------------------------

CREATE OR REPLACE VIEW EmployeePerformanceView AS
SELECT e.EmpID, e.EmpName, d.DeptName, p.ProjectID, pr.ProjectName, p.Rating, p.ReviewDate
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
LEFT JOIN Project pr ON p.ProjectID = pr.ProjectID
LEFT JOIN Department d ON e.DeptID = d.DeptID;

DROP PROCEDURE IF EXISTS GetTopPerformers;
DELIMITER $$
CREATE PROCEDURE GetTopPerformers(IN deptNameIn VARCHAR(100))
BEGIN
  SELECT e.EmpID, e.EmpName, AVG(p.Rating) AS AvgRating
  FROM Performance p
  JOIN Employee e ON p.EmpID = e.EmpID
  JOIN Department d ON e.DeptID = d.DeptID
  WHERE d.DeptName = deptNameIn
  GROUP BY e.EmpID, e.EmpName
  ORDER BY AvgRating DESC
  LIMIT 3;
END$$
DELIMITER ;

-- --------------------------------------------------
-- Basic validation checks (quick assertions)
-- Run these after the script to verify expected rows were created
-- --------------------------------------------------

SELECT 'Department_count' AS CheckName, COUNT(*) AS CountRows FROM Department;
SELECT 'Employee_count' AS CheckName, COUNT(*) AS CountRows FROM Employee;
SELECT 'Project_count' AS CheckName, COUNT(*) AS CountRows FROM Project;
SELECT 'Performance_count' AS CheckName, COUNT(*) AS CountRows FROM Performance;
SELECT 'Reward_count' AS CheckName, COUNT(*) AS CountRows FROM Reward;



