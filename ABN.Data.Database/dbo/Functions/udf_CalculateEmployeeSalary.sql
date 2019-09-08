
-- =============================================
-- Author:		Sanvir Manilal
-- Create date: 08-09-2019
-- Description:	Given employee Length of Employment and Age, return the calculated salary
-- =============================================
CREATE FUNCTION [dbo].[udf_CalculateEmployeeSalary] 
(
	@age INT,
	@lengthOfEmployment DEC(3,2)
)
RETURNS MONEY
AS
BEGIN
	DECLARE @basicSalary MONEY = 50000;
	DECLARE @bracketPayRate FLOAT;
	DECLARE @longServiceBonusRate FLOAT;
	DECLARE @calculatedSalary MONEY;
	
	SET @bracketPayRate = CASE
		WHEN @age >= 50 THEN 1.5
		WHEN @age >= 30 THEN 1.2
		WHEN @age < 20 THEN 0.8
		ELSE 1
	END;

	SET @longServiceBonusRate = CASE
		WHEN @lengthOfEmployment >= 10 THEN 2
		WHEN @lengthOfEmployment >= 5 THEN 1.5
		WHEN @lengthOfEmployment >= 2 THEN 1.1
		ELSE 1
	END;
	
	SET @calculatedSalary = @basicSalary * @bracketPayRate * @longServiceBonusRate;
	RETURN @calculatedSalary;
END