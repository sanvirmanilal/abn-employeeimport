CREATE TABLE [dbo].[Employee] (
    [Id]        INT            NOT NULL,
    [FirstName] NVARCHAR (255) NULL,
    [LastName]  NVARCHAR (255) NULL,
    [Age]       INT            NULL,
    [Salary]    MONEY          NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

