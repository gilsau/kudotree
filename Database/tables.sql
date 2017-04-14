use KudoTree
go

print '*** Table: State ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'State')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_Account_State')
	begin
		alter table Account drop constraint fk_Account_State
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_Business_State')
	begin
		alter table Business drop constraint fk_Business_State
	end
	
	drop table dbo.[State]
end
go
create table dbo.[State]
(
	Id int identity(1,1) not null primary key,
	Abbrev nvarchar(5) not null,
	Name nvarchar(50) not null
)
go
insert into [State]
select 'AL', 'Alabama'
union select 'AK', 'Alaska'
union select 'AZ', 'Arizona'
union select 'AR', 'Arkansas'
union select 'CA', 'California'
union select 'CO', 'Colorado'
union select 'CT', 'Connecticut'
union select 'DE', 'Delaware'
union select 'DC', 'District Of Columbia'
union select 'FL', 'Florida'
union select 'GA', 'Georgia'
union select 'HI', 'Hawaii'
union select 'ID', 'Idaho'
union select 'IL', 'Illinois'
union select 'IN', 'Indiana'
union select 'IA', 'Iowa'
union select 'KS', 'Kansas'
union select 'KY', 'Kentucky'
union select 'LA', 'Louisiana'
union select 'ME', 'Maine'
union select 'MD', 'Maryland'
union select 'MA', 'Massachusetts'
union select 'MI', 'Michigan'
union select 'MN', 'Minnesota'
union select 'MS', 'Mississippi'
union select 'MO', 'Missouri'
union select 'MT', 'Montana'
union select 'NE', 'Nebraska'
union select 'NV', 'Nevada'
union select 'NH', 'New Hampshire'
union select 'NJ', 'New Jersey'
union select 'NM', 'New Mexico'
union select 'NY', 'New York'
union select 'NC', 'North Carolina'
union select 'ND', 'North Dakota'
union select 'OH', 'Ohio'
union select 'OK', 'Oklahoma'
union select 'OR', 'Oregon'
union select 'PA', 'Pennsylvania'
union select 'RI', 'Rhode Island'
union select 'SC', 'South Carolina'
union select 'SD', 'South Dakota'
union select 'TN', 'Tennessee'
union select 'TX', 'Texas'
union select 'UT', 'Utah'
union select 'VT', 'Vermont'
union select 'VA', 'Virginia'
union select 'WA', 'Washington'
union select 'WV', 'West Virginia'
union select 'WI', 'Wisconsin'
union select 'WY', 'Wyoming'
go

print '*** Table: Country ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'Country')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_Account_Country')
	begin
		alter table Account drop constraint fk_Account_Country
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_Business_Country')
	begin
		alter table Business drop constraint fk_Business_Country
	end
	
	drop table dbo.Country
end
go
create table dbo.Country
(
	Id int identity(1,1) not null primary key,
	Abbrev nvarchar(5) not null,
	Name nvarchar(50) not null
)
go
insert into Country
select 'AFG', 'AFGHANISTAN'
union select 'ALB', 'ALBANIA'
union select 'DZA', 'ALGERIA'
union select 'ASM', 'AMERICAN SAMOA'
union select 'AND', 'ANDORRA'
union select 'AGO', 'ANGOLA'
union select 'AIA', 'ANGUILLA'
union select 'ATA', 'ANTARCTICA'
union select 'ATG', 'ANTIGUA AND BARBUDA'
union select 'ARG', 'ARGENTINA'
union select 'ARM', 'ARMENIA'
union select 'ABW', 'ARUBA'
union select 'AUS', 'AUSTRALIA'
union select 'AUT', 'AUSTRIA'
union select 'AZE', 'AZERBAIJAN'
union select 'BHS', 'BAHAMAS'
union select 'BHR', 'BAHRAIN'
union select 'BGD', 'BANGLADESH'
union select 'BRB', 'BARBADOS'
union select 'BLR', 'BELARUS'
union select 'BEL', 'BELGIUM'
union select 'BLZ', 'BELIZE'
union select 'BEN', 'BENIN'
union select 'BMU', 'BERMUDA'
union select 'BTN', 'BHUTAN'
union select 'BOL', 'BOLIVIA'
union select 'BIH', 'BOSNIA AND HERZEGOWINA'
union select 'BWA', 'BOTSWANA'
union select 'BVT', 'BOUVET ISLAND'
union select 'BRA', 'BRAZIL'
union select 'IOT', 'BRITISH INDIAN OCEAN TERRITORY'
union select 'BRN', 'BRUNEI DARUSSALAM'
union select 'BGR', 'BULGARIA'
union select 'BFA', 'BURKINA FASO'
union select 'BDI', 'BURUNDI'
union select 'KHM', 'CAMBODIA'
union select 'CMR', 'CAMEROON'
union select 'CAN', 'CANADA'
union select 'CPV', 'CAPE VERDE'
union select 'CYM', 'CAYMAN ISLANDS'
union select 'CAF', 'CENTRAL AFRICAN REPUBLIC'
union select 'TCD', 'CHAD'
union select 'CHL', 'CHILE'
union select 'CHN', 'CHINA'
union select 'CXR', 'CHRISTMAS ISLAND'
union select 'CCK', 'COCOS (KEELING) ISLANDS'
union select 'COL', 'COLOMBIA'
union select 'COM', 'COMOROS'
union select 'COG', 'CONGO'
union select 'COD', 'CONGO, THE DRC'
union select 'COK', 'COOK ISLANDS'
union select 'CRI', 'COSTA RICA'
union select 'CIV', 'COTE D''IVOIRE'
union select 'HRV', 'CROATIA (local name: Hrvatska)'
union select 'CUB', 'CUBA'
union select 'CYP', 'CYPRUS'
union select 'CZE', 'CZECH REPUBLIC'
union select 'DNK', 'DENMARK'
union select 'DJI', 'DJIBOUTI'
union select 'DMA', 'DOMINICA'
union select 'DOM', 'DOMINICAN REPUBLIC'
union select 'TMP', 'EAST TIMOR'
union select 'ECU', 'ECUADOR'
union select 'EGY', 'EGYPT'
union select 'SLV', 'EL SALVADOR'
union select 'GNQ', 'EQUATORIAL GUINEA'
union select 'ERI', 'ERITREA'
union select 'EST', 'ESTONIA'
union select 'ETH ', 'ETHIOPIA'
union select 'FLK', 'FALKLAND ISLANDS (MALVINAS)'
union select 'FRO', 'FAROE ISLANDS'
union select 'FJI', 'FIJI'
union select 'FIN', 'FINLAND'
union select 'FRA', 'FRANCE'
union select 'FXX', 'FRANCE, METROPOLITAN'
union select 'GUF', 'FRENCH GUIANA'
union select 'PYF', 'FRENCH POLYNESIA'
union select 'ATF', 'FRENCH SOUTHERN TERRITORIES'
union select 'GAB', 'GABON'
union select 'GMB', 'GAMBIA'
union select 'GEO', 'GEORGIA'
union select 'DEU', 'GERMANY'
union select 'GHA', 'GHANA'
union select 'GIB', 'GIBRALTAR'
union select 'GRC', 'GREECE'
union select 'GRL', 'GREENLAND'
union select 'GRD', 'GRENADA'
union select 'GLP', 'GUADELOUPE'
union select 'GUM', 'GUAM'
union select 'GTM', 'GUATEMALA'
union select 'GIN', 'GUINEA'
union select 'GNB', 'GUINEA-BISSAU'
union select 'GUY', 'GUYANA'
union select 'HTI', 'HAITI'
union select 'HMD', 'HEARD AND MC DONALD ISLANDS'
union select 'VAT', 'HOLY SEE (VATICAN CITY STATE)'
union select 'HND', 'HONDURAS'
union select 'HKG', 'HONG KONG'
union select 'HUN', 'HUNGARY'
union select 'ISL', 'ICELAND'
union select 'IND', 'INDIA'
union select 'IDN', 'INDONESIA'
union select 'IRN', 'IRAN (ISLAMIC REPUBLIC OF)'
union select 'IRQ', 'IRAQ'
union select 'IRL', 'IRELAND'
union select 'ISR', 'ISRAEL'
union select 'ITA', 'ITALY'
union select 'JAM', 'JAMAICA'
union select 'JPN', 'JAPAN'
union select 'JOR', 'JORDAN'
union select 'KAZ', 'KAZAKHSTAN'
union select 'KEN', 'KENYA'
union select 'KIR', 'KIRIBATI'
union select 'PRK', 'KOREA, D.P.R.O.'
union select 'KOR', 'KOREA, REPUBLIC OF'
union select 'KWT', 'KUWAIT'
union select 'KGZ', 'KYRGYZSTAN'
union select 'LAO', 'LAOS '
union select 'LVA', 'LATVIA'
union select 'LBN', 'LEBANON'
union select 'LSO', 'LESOTHO'
union select 'LBR', 'LIBERIA'
union select 'LBY', 'LIBYAN ARAB JAMAHIRIYA'
union select 'LIE', 'LIECHTENSTEIN'
union select 'LTU', 'LITHUANIA'
union select 'LUX', 'LUXEMBOURG'
union select 'MAC', 'MACAU'
union select 'MKD', 'MACEDONIA'
union select 'MDG', 'MADAGASCAR'
union select 'MWI', 'MALAWI'
union select 'MYS', 'MALAYSIA'
union select 'MDV', 'MALDIVES'
union select 'MLI', 'MALI'
union select 'MLT', 'MALTA'
union select 'MHL', 'MARSHALL ISLANDS'
union select 'MTQ', 'MARTINIQUE'
union select 'MRT', 'MAURITANIA'
union select 'MUS', 'MAURITIUS'
union select 'MYT', 'MAYOTTE'
union select 'MEX', 'MEXICO'
union select 'FSM', 'MICRONESIA, FEDERATED STATES OF'
union select 'MDA', 'MOLDOVA, REPUBLIC OF'
union select 'MCO', 'MONACO'
union select 'MNG', 'MONGOLIA'
union select 'MNE', 'MONTENEGRO'
union select 'MSR', 'MONTSERRAT'
union select 'MAR', 'MOROCCO'
union select 'MOZ', 'MOZAMBIQUE'
union select 'MMR', 'MYANMAR (Burma) '
union select 'NAM', 'NAMIBIA'
union select 'NRU', 'NAURU'
union select 'NPL', 'NEPAL'
union select 'NLD', 'NETHERLANDS'
union select 'ANT', 'NETHERLANDS ANTILLES'
union select 'NCL', 'NEW CALEDONIA'
union select 'NZL', 'NEW ZEALAND'
union select 'NIC', 'NICARAGUA'
union select 'NER', 'NIGER'
union select 'NGA', 'NIGERIA'
union select 'NIU', 'NIUE'
union select 'NFK', 'NORFOLK ISLAND'
union select 'MNP', 'NORTHERN MARIANA ISLANDS'
union select 'NOR', 'NORWAY'
union select 'OMN', 'OMAN'
union select 'PAK', 'PAKISTAN'
union select 'PLW', 'PALAU'
union select 'PAN', 'PANAMA'
union select 'PNG', 'PAPUA NEW GUINEA'
union select 'PRY', 'PARAGUAY'
union select 'PER', 'PERU'
union select 'PHL', 'PHILIPPINES'
union select 'PCN', 'PITCAIRN'
union select 'POL', 'POLAND'
union select 'PRT', 'PORTUGAL'
union select 'PRI', 'PUERTO RICO'
union select 'QAT', 'QATAR'
union select 'REU', 'REUNION'
union select 'ROM', 'ROMANIA'
union select 'RUS', 'RUSSIAN FEDERATION'
union select 'RWA', 'RWANDA'
union select 'KNA', 'SAINT KITTS AND NEVIS'
union select 'LCA', 'SAINT LUCIA'
union select 'VCT', 'SAINT VINCENT AND THE GRENADINES'
union select 'WSM', 'SAMOA'
union select 'SMR', 'SAN MARINO'
union select 'STP', 'SAO TOME AND PRINCIPE'
union select 'SAU', 'SAUDI ARABIA'
union select 'SEN', 'SENEGAL'
union select 'SRB', 'SERBIA'
union select 'SYC', 'SEYCHELLES'
union select 'SLE', 'SIERRA LEONE'
union select 'SGP', 'SINGAPORE'
union select 'SVK', 'SLOVAKIA (Slovak Republic)'
union select 'SVN', 'SLOVENIA'
union select 'SLB', 'SOLOMON ISLANDS'
union select 'SOM', 'SOMALIA'
union select 'ZAF', 'SOUTH AFRICA'
union select 'SSD', 'SOUTH SUDAN'
union select 'SGS', 'SOUTH GEORGIA AND SOUTH S.S.'
union select 'ESP', 'SPAIN'
union select 'LKA', 'SRI LANKA'
union select 'SHN', 'ST. HELENA'
union select 'SPM', 'ST. PIERRE AND MIQUELON'
union select 'SDN', 'SUDAN'
union select 'SUR', 'SURINAME'
union select 'SJM', 'SVALBARD AND JAN MAYEN ISLANDS'
union select 'SWZ', 'SWAZILAND'
union select 'SWE', 'SWEDEN'
union select 'CHE', 'SWITZERLAND'
union select 'SYR', 'SYRIAN ARAB REPUBLIC'
union select 'TWN', 'TAIWAN, PROVINCE OF CHINA'
union select 'TJK', 'TAJIKISTAN'
union select 'TZA', 'TANZANIA, UNITED REPUBLIC OF'
union select 'THA', 'THAILAND'
union select 'TGO', 'TOGO'
union select 'TKL', 'TOKELAU'
union select 'TON', 'TONGA'
union select 'TTO', 'TRINIDAD AND TOBAGO'
union select 'TUN', 'TUNISIA'
union select 'TUR', 'TURKEY'
union select 'TKM', 'TURKMENISTAN'
union select 'TCA', 'TURKS AND CAICOS ISLANDS'
union select 'TUV', 'TUVALU'
union select 'UGA', 'UGANDA'
union select 'UKR', 'UKRAINE'
union select 'ARE', 'UNITED ARAB EMIRATES'
union select 'GBR', 'UNITED KINGDOM'
union select 'USA', 'UNITED STATES'
union select 'UMI', 'U.S. MINOR ISLANDS'
union select 'URY', 'URUGUAY'
union select 'UZB', 'UZBEKISTAN'
union select 'VUT', 'VANUATU'
union select 'VEN', 'VENEZUELA'
union select 'VNM', 'VIET NAM'
union select 'VGB', 'VIRGIN ISLANDS (BRITISH)'
union select 'VIR', 'VIRGIN ISLANDS (U.S.)'
union select 'WLF', 'WALLIS AND FUTUNA ISLANDS'
union select 'ESH', 'WESTERN SAHARA'
union select 'YEM', 'YEMEN'
union select 'ZMB', 'ZAMBIA'
union select 'ZWE', 'ZIMBABWE'
go

print '*** Table: Business ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'Business')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountBusiness_Business')
	begin
		alter table AccountBusiness drop constraint fk_AccountBusiness_Business
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountAssociation_Business')
	begin
		alter table AccountAssociation drop constraint fk_AccountAssociation_Business
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountExperience_Business')
	begin
		alter table AccountExperience drop constraint fk_AccountExperience_Business
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountEducation_Business')
	begin
		alter table AccountEducation drop constraint fk_AccountEducation_Business
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_BusinessProductService_Business')
	begin
		alter table BusinessProductService drop constraint fk_BusinessProductService_Business
	end

	drop table dbo.Business
end
go
create table dbo.Business
(
	Id int identity(1,1) not null primary key,
	Name nvarchar(50) not null,
	Address1 nvarchar(50) null,
	Address2 nvarchar(50) null,
	City nvarchar(50) null,
	StateId int null constraint fk_Business_State foreign key references [State](Id),
	Zipcode nvarchar(15) null,
	CountryId int null constraint fk_Business_Country foreign key references Country(Id)
)
go

print '*** Table: Account ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'Account')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountToken_Account')
	begin
		alter table AccountToken drop constraint fk_AccountToken_Account
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountBusiness_Account')
	begin
		alter table AccountBusiness drop constraint fk_AccountBusiness_Account
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountKudo_Receiver')
	begin
		alter table AccountKudo drop constraint fk_AccountKudo_Receiver
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountKudo_Giver')
	begin
		alter table AccountKudo drop constraint fk_AccountKudo_Giver
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountPrefer_Account1')
	begin
		alter table AccountPrefer drop constraint fk_AccountPrefer_Account1
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountPrefer_Account2')
	begin
		alter table AccountPrefer drop constraint fk_AccountPrefer_Account2
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_NetworkMember_Account')
	begin
		alter table NetworkMember drop constraint fk_NetworkMember_Account
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountSkill_Account')
	begin
		alter table AccountSkill drop constraint fk_AccountSkill_Account
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountInterest_Account')
	begin
		alter table AccountInterest drop constraint fk_AccountInterest_Account
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountResume_Account')
	begin
		alter table AccountResume drop constraint fk_AccountResume_Account
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountExperience_Account')
	begin
		alter table AccountExperience drop constraint fk_AccountExperience_Account
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountAssociation_Account')
	begin
		alter table AccountAssociation drop constraint fk_AccountAssociation_Account
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountEducation_Account')
	begin
		alter table AccountEducation drop constraint fk_AccountEducation_Account
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_Network_Account_Owner')
	begin
		alter table Network drop constraint fk_Network_Account_Owner
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_Communication_Account_Sender')
	begin
		alter table Communication drop constraint fk_Communication_Account_Sender
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_Communication_Account_Receiver')
	begin
		alter table Communication drop constraint fk_Communication_Account_Receiver
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountConnection_Account')
	begin
		alter table AccountConnection drop constraint fk_AccountConnection_Account
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountConnection_Connection')
	begin
		alter table AccountConnection drop constraint fk_AccountConnection_Connection
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountPost_PostedBy')
	begin
		alter table AccountPost drop constraint fk_AccountPost_PostedBy
	end
	
	drop table dbo.[Account]
end
go
create table dbo.Account
(
	Id int identity(1,1) not null primary key,
	Firstname nvarchar(50) not null,
	Lastname nvarchar(50) not null,
	Email nvarchar(100) not null,
	[Password] nvarchar(50) not null,
	City nvarchar(50)null,
	StateId int null constraint fk_Account_State foreign key references State(Id),
	CountryId int null constraint fk_Account_Country foreign key references Country(Id),
	Zipcode nvarchar(15) null,
	Gender int null,
	DOB datetime null,
	JobTitle nvarchar(50) null,
	Summary text null,
	BusinessOwner bit null,
	BusinessOwnerKudoHelp bit null,
	JobSeeker bit null,
	JobSeekerKudoHelp bit null,
	Student bit null,
	StudentKudoHelp bit null,
	ProfilePic nvarchar(50) null,
	ResumeFile nvarchar(100) null,
	Token uniqueidentifier null,
	TokenExpired bit null,
	Active bit not null default 0,
	Created datetime not null default getdate(),
	CreatedBy nvarchar(100) not null default 'system',
	LastUpdated datetime not null default getdate(),
	LastUpdatedBy nvarchar(100) not null default 'system'
)
go

print '*** Table: AccountToken ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountToken')
begin
	drop table dbo.AccountToken
end
go
create table dbo.AccountToken
(
	Id int identity(1,1) not null primary key,
	AccountId int not null constraint fk_AccountToken_Account foreign key references [Account](Id),
	Expired bit not null default 0,
	Created datetime not null default getdate(),
	Token uniqueidentifier not null
)
go

print '*** Table: Network ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'Network')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_NetworkMember_Network')
	begin
		alter table NetworkMember drop constraint fk_NetworkMember_Network
	end
	
	drop table dbo.Network
end
go
create table dbo.Network
(
	Id int identity(1,1) not null primary key,
	Name nvarchar(50) not null,
	OwnerId int not null constraint fk_Network_Account_Owner foreign key references [Account](Id),
	IsPreferred bit null
)
go

print '*** Table: NetworkMember ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'NetworkMember')
begin
	drop table dbo.NetworkMember
end
go
create table dbo.NetworkMember
(
	Id int identity(1,1) not null primary key,
	NetworkId int not null constraint fk_NetworkMember_Network foreign key references Network(Id),
	MemberId int not null constraint fk_NetworkMember_Account foreign key references [Account](Id)
)
go

print '*** Table: AccountKudo ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountKudo')
begin
	drop table dbo.AccountKudo
end
go
create table dbo.AccountKudo
(
	Id int identity(1,1) not null primary key,
	ReceiverId int not null constraint fk_AccountKudo_Receiver foreign key references Account(Id),
	GiverId int not null constraint fk_AccountKudo_Giver foreign key references Account(Id),
	Comment text not null,
	Created datetime not null default getdate(),
	CreatedBy nvarchar(100) not null default 'system',
	LastUpdated datetime not null default getdate(),
	LastUpdatedBy nvarchar(100) not null default 'system'
)
go

print '*** Table: AccountEducation ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountEducation')
begin
	drop table dbo.AccountEducation
end
go
create table dbo.AccountEducation
(
	Id int identity(1,1) not null primary key,
	AccountId int not null constraint fk_AccountEducation_Account foreign key references Account(Id),
	BusinessId int not null constraint fk_AccountEducation_Business foreign key references Business(Id),
	YearAttendedFrom datetime null,
	YearAttendedTo datetime null,
	Certification nvarchar(100) null
)
go

print '*** Table: AccountBusiness ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountBusiness')
begin
	drop table dbo.AccountBusiness
end
go
create table dbo.AccountBusiness
(
	Id int identity(1,1) not null primary key,
	AccountId int not null constraint fk_AccountBusiness_Account foreign key references Account(Id),
	BusinessId int not null constraint fk_AccountBusiness_Business foreign key references Business(Id)
)
go

print '*** Table: AssociationType ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AssociationType')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountBusiness_AssociationType')
	begin
		alter table AccountBusiness drop constraint fk_AccountBusiness_AssociationType
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountAssociation_AssociationType')
	begin
		alter table AccountAssociation drop constraint fk_AccountAssociation_AssociationType
	end
	
	drop table dbo.AssociationType
end
go
create table dbo.AssociationType
(
	Id int identity(1,1) not null primary key,
	Name nvarchar(50) not null
)
go
insert into AssociationType values('Customer')
insert into AssociationType values('Member')
insert into AssociationType values('Other')
go

print '*** Table: AccountAssociation ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountAssociation')
begin
	drop table dbo.AccountAssociation
end
go
create table dbo.AccountAssociation
(
	Id int identity(1,1) not null primary key,
	AccountId int not null constraint fk_AccountAssociation_Account foreign key references Account(Id),
	BusinessId int not null constraint fk_AccountAssociation_Business foreign key references Business(Id),
	AssociationTypeId int not null constraint fk_AccountAssociation_AssociationType foreign key references AssociationType(Id),
	[Description] text null
)
go

print '*** Table: AccountSkill ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountSkill')
begin
	drop table dbo.AccountSkill
end
go
create table dbo.AccountSkill
(
	Id int identity(1,1) not null primary key,
	AccountId int not null constraint fk_AccountSkill_Account foreign key references Account(Id),
	Name nvarchar(50) not null,
	YearsUsed int null,
	Proficiency int null
)
go

print '*** Table: Interest ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'Interest')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountInterest_Interest')
	begin
		alter table AccountInterest drop constraint fk_AccountInterest_Interest
	end

	drop table dbo.Interest
end
go
create table dbo.Interest
(
	Id int identity(1,1) not null primary key,
	Name nvarchar(50) not null
)
go

print '*** Table: AccountInterest ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountInterest')
begin
	drop table dbo.AccountInterest
end
go
create table dbo.AccountInterest
(
	Id int identity(1,1) not null primary key,
	AccountId int not null constraint fk_AccountInterest_Account foreign key references Account(Id),
	InterestId int not null constraint fk_AccountInterest_Interest foreign key references Interest(Id)
)
go

print '*** Table: AccountResume ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountResume')
begin
	drop table dbo.AccountResume
end
go
create table dbo.AccountResume
(
	Id int identity(1,1) not null primary key,
	AccountId int not null constraint fk_AccountResume_Account foreign key references Account(Id),
	Name nvarchar(50) not null,
	[Filename] nvarchar(50) not null,
	Active bit not null default 0,
	Created datetime not null default getdate(),
	CreatedBy nvarchar(100) not null default 'system',
	LastUpdated datetime not null default getdate(),
	LastUpdatedBy nvarchar(100) not null default 'system'
)
go

print '*** Table: AccountExperience ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountExperience')
begin
	drop table dbo.AccountExperience
end
go
create table dbo.AccountExperience
(
	Id int identity(1,1) not null primary key,
	AccountId int not null constraint fk_AccountExperience_Account foreign key references Account(Id),
	BusinessId int not null constraint fk_AccountExperience_Business foreign key references Business(Id),
	DateFrom datetime null,
	DateTo datetime null,
	JobTitle nvarchar(50) null,
	ExtraInfo nvarchar(50) null,
	[Description] text null
)
go

print '*** Table: BusinessProductService ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'BusinessProductService')
begin
	drop table dbo.BusinessProductService
end
go
create table dbo.BusinessProductService
(
	Id int identity(1,1) not null primary key,
	BusinessId int not null constraint fk_BusinessProductService_Business foreign key references Business(Id),
	ProductService nvarchar(150) not null,
	[Description] nvarchar(1000) null
)
go

print '*** Table: Privacy ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'Privacy')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountPost_Privacy')
	begin
		alter table AccountPost drop constraint fk_AccountPost_Privacy
	end

	drop table dbo.Privacy
end
go
create table dbo.Privacy
(
	Id int identity(1,1) not null primary key,
	Name nvarchar(50) not null
)
go
insert into Privacy values('Friends')
insert into Privacy values('Public')
go

print '*** Table: Status ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'Status')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountConnection_Status')
	begin
		alter table AccountConnection drop constraint fk_AccountConnection_Status
	end
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_Communication_Status')
	begin
		alter table Communication drop constraint fk_Communication_Status
	end
	
	drop table dbo.[Status]
end
go
create table dbo.[Status]
(
	Id int identity(1,1) not null primary key,
	Name nvarchar(50) not null
)
go

insert into [Status] values('New')
insert into [Status] values('Read')
insert into [Status] values('Accepted')
insert into [Status] values('Denied')
insert into [Status] values('Online')
insert into [Status] values('Offline')
insert into [Status] values('Active')
go

print '*** Table: CommMethod ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'CommMethod')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_Communication_CommMethod')
	begin
		alter table Communication drop constraint fk_Communication_CommMethod
	end
	
	drop table dbo.CommMethod
end
go
create table dbo.CommMethod
(
	Id int identity(1,1) not null primary key,
	Name nvarchar(50) not null
)
go
insert into CommMethod values('Email')
insert into CommMethod values('Internal Message')
insert into CommMethod values('Notification')
insert into CommMethod values('Text Message')
go

print '*** Table: Action ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'Action')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_Communication_Action')
	begin
		alter table Communication drop constraint fk_Communication_Action
	end
	
	drop table dbo.[Action]
end
go
create table dbo.[Action]
(
	Id int identity(1,1) not null primary key,
	Name nvarchar(50) not null
)
go
insert into [Action] values('Connect Request')
insert into [Action] values('Calendar Request')
insert into [Action] values('Calendar Accept')
insert into [Action] values('Need Request')
insert into [Action] values('Sent Kudos')
insert into [Action] values('Prefers You')
insert into [Action] values('Commented')
insert into [Action] values('None')
go

print '*** Table: Communication ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'Communication')
begin
	drop table dbo.Communication
end
go
create table dbo.Communication
(
	Id int identity(1,1) not null primary key,
	CommMethodId int not null constraint fk_Communication_CommMethod foreign key references CommMethod(Id),
	ActionId int not null constraint fk_Communication_Action foreign key references [Action](Id),
	SenderId int not null constraint fk_Communication_Account_Sender foreign key references [Account](Id),
	ReceiverId int not null constraint fk_Communication_Account_Receiver foreign key references [Account](Id),
	StatusId int not null constraint fk_Communication_Status foreign key references [Status](Id),
	ConversationId uniqueidentifier null,
	Msg text null,
	LinkId int null,
	Created datetime not null default getdate(),
	CreatedBy nvarchar(100) not null default 'system',
	LastUpdated datetime not null default getdate(),
	LastUpdatedBy nvarchar(100) not null default 'system'
)
go

print '*** Table: AccountConnection ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountConnection')
begin
	drop table dbo.AccountConnection
end
go
create table dbo.AccountConnection
(
	Id int identity(1,1) not null primary key,
	AccountId int not null constraint fk_AccountConnection_Account foreign key references [Account](Id),
	ConnectionId int not null constraint fk_AccountConnection_Connection foreign key references [Account](Id)
)
go

print '*** Table: AccountPost ******************************************************'
if exists(select 1 from INFORMATION_SCHEMA.TABLES where TABLE_NAME = N'AccountPost')
begin
	if exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_NAME = N'fk_AccountPost_ParentPost')
	begin
		alter table AccountPost drop constraint fk_AccountPost_ParentPost
	end

	drop table dbo.AccountPost
end
go
create table dbo.AccountPost
(
	Id int identity(1,1) not null primary key,
	ParentAccountPostId int null constraint fk_AccountPost_ParentPost foreign key references AccountPost(Id),
	PostedByAccountId int not null constraint fk_AccountPost_PostedBy foreign key references [Account](Id),
	PhotoFile nvarchar(100) null,
	VideoUrl nvarchar(250) null,
	Comment text null,
	PrivacyId int null constraint fk_AccountPost_Privacy foreign key references Privacy(Id),
	Created datetime not null
)
go

/*
select * from Status

select * from communication
truncate table communication
update communication set statustoid = 1

update Account set Password = 'kudos'

use kudotree

sp_tables

sp_columns accountkudo
select * from accountkudo

select * from account

select * from accounttoken

select * from accountpost
truncate table accountpost

select * from network
delete network

select * from accountconnection
truncate table accountconnection

*/