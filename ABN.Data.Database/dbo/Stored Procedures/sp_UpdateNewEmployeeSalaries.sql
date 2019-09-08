-- =============================================
-- Author:		Sanvir Manilal
-- Create date: 08-09-2019
-- Description:	Updated the Employee table with calculated salaries for new employees
-- =============================================
CREATE PROCEDURE [dbo].[sp_UpdateNewEmployeeSalaries] 
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE Employee
	SET Salary =  dbo.udf_CalculateEmployeeSalary(Age, LengthOfEmployment)
	WHERE Salary is null 
END