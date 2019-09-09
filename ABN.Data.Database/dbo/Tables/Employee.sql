CREATE TABLE [dbo].[Employee] (
    [Id]                 INT            IDENTITY (1, 1) NOT NULL,
    [FirstName]          NVARCHAR (255) NULL,
    [LastName]           NVARCHAR (255) NULL,
    [Age]                INT            NULL,
    [Salary]             MONEY          NULL,
    [LengthOfEmployment] DECIMAL (5, 2) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);



