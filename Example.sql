ALTER TABLE AlarmRaport DROP CONSTRAINT AlarmRaport_Alarms;

ALTER TABLE AlarmRaport DROP CONSTRAINT AlarmRaport_Machine;

ALTER TABLE AlarmRaport DROP CONSTRAINT AlarmRaport_User;

ALTER TABLE SetupInspection DROP CONSTRAINT MachineConfig_QualityControl;

ALTER TABLE MachineWorkCycle DROP CONSTRAINT MachineWorkCycle_Recipes;

ALTER TABLE MachineWorkCycle DROP CONSTRAINT MachineWorkCycle_Stops;

ALTER TABLE MachineWorkCycle DROP CONSTRAINT MachineWorkCycle_User;

ALTER TABLE MachineWorkCycle DROP CONSTRAINT MachineWorkCycles_Machine;

ALTER TABLE Menu_Role DROP CONSTRAINT Menu_Role_Menu;

ALTER TABLE Menu_Role DROP CONSTRAINT Menu_Role_Role;

ALTER TABLE QualityInspection DROP CONSTRAINT QualityControl_MachineWorkCycles;

ALTER TABLE QualityInspection DROP CONSTRAINT QualityInspection_User;

ALTER TABLE Recipe DROP CONSTRAINT Recipes_Machine;

ALTER TABLE Recipe DROP CONSTRAINT Recipes_User;

ALTER TABLE ScrapRaport DROP CONSTRAINT ScrapRaport_MachineWorkCycles;

ALTER TABLE ScrapRaport DROP CONSTRAINT ScrapRaport_Scrap;

ALTER TABLE ScrapRaport DROP CONSTRAINT ScrapRaport_User;

ALTER TABLE SetupInspection DROP CONSTRAINT SetupInspection_User;

ALTER TABLE "User" DROP CONSTRAINT User_Role;

-- tables
DROP TABLE AlarmRaport;

DROP TABLE Alarms;

DROP TABLE Machine;

DROP TABLE MachineWorkCycle;

DROP TABLE Menu;

DROP TABLE Menu_Role;

DROP TABLE QualityInspection;

DROP TABLE Recipe;

DROP TABLE Role;

DROP TABLE Scrap;

DROP TABLE ScrapRaport;

DROP TABLE SetupInspection;

DROP TABLE Stops;

DROP TABLE "User";

DROP TABLE Visualization;





-- tables
-- Table: AlarmRaport
CREATE TABLE AlarmRaport (
    id int  NOT NULL,
    Machine_id smallint  NOT NULL,
    timestart datetime  NOT NULL,
    User_id int  NOT NULL,
    Alarms_id smallint  NOT NULL,
    CONSTRAINT AlarmRaport_pk PRIMARY KEY  (id)
);

-- Table: Alarms
CREATE TABLE Alarms (
    id smallint  NOT NULL,
    reason varchar(50)  NOT NULL,
    CONSTRAINT Alarms_pk PRIMARY KEY  (id)
);

-- Table: Machine
CREATE TABLE Machine (
    id smallint  NOT NULL,
    machine_code varchar(5)  NOT NULL,
    CONSTRAINT Machine_pk PRIMARY KEY  (id)
);

-- Table: MachineWorkCycle
CREATE TABLE MachineWorkCycle (
    id bigint  NOT NULL,
    Machine_id smallint  NOT NULL,
    timestart datetime  NOT NULL,
    timework smallint  NOT NULL,
    timewait smallint  NOT NULL,
    User_id int  NOT NULL,
    worksorder varchar(40)  NOT NULL,
    partnum varchar(40)  NOT NULL,
    Recipe_id int  NOT NULL,
    quantity smallint  NOT NULL,
    Stops_id smallint  NULL,
    CONSTRAINT MachineWorkCycle_pk PRIMARY KEY  (id)
);

-- Table: Menu
CREATE TABLE Menu (
    id int  NOT NULL,
    title varchar(30)  NOT NULL,
    page_address varchar(200)  NOT NULL,
    CONSTRAINT Menu_pk PRIMARY KEY  (id)
);

-- Table: Menu_Role
CREATE TABLE Menu_Role (
    Menu_id int  NOT NULL,
    Role_id int  NOT NULL,
    CONSTRAINT Menu_Role_pk PRIMARY KEY  (Role_id,Menu_id)
);

-- Table: QualityInspection
CREATE TABLE QualityInspection (
    id bigint  NOT NULL,
    MachineWorkCycles_id bigint  NOT NULL,
    timestart datetime  NOT NULL,
    User_id int  NOT NULL,
    weight int  NOT NULL,
    diameter int  NOT NULL,
    c_length bit  NOT NULL,
    c_diamet bit  NOT NULL,
    n_brittle bit  NOT NULL,
    n_fibrous bit  NOT NULL,
    g_cut bit  NOT NULL,
    CONSTRAINT QualityInspection_pk PRIMARY KEY  (id)
);

-- Table: Recipe
CREATE TABLE Recipe (
    id int  NOT NULL,
    Source tinyint  NOT NULL,
    Machine_id smallint  NOT NULL,
    timestart datetime  NOT NULL,
    User_id int  NOT NULL,
    name varchar(30)  NOT NULL,
    moves int  NOT NULL,
    distance int  NOT NULL,
    airFlow int  NOT NULL,
    airTemp int  NOT NULL,
    screwSpeed int  NOT NULL,
    rollerPress int  NOT NULL,
    water int  NOT NULL,
    carrSpeed int  NOT NULL,
    rotatSpeed int  NOT NULL,
    tempZone1 int  NOT NULL,
    tempZone2 int  NOT NULL,
    tempZone3 int  NOT NULL,
    tempZone4 int  NOT NULL,
    tempDie int  NOT NULL,
    stbExtrSpeed int  NOT NULL,
    stbScrwSpeed int  NOT NULL,
    stbAirFlow int  NOT NULL,
    stbAirTemp int  NOT NULL,
    carrRetDelBott int  NOT NULL,
    carrRetDelTop int  NOT NULL,
    carrAccDcc int  NOT NULL,
    diameterEmpt decimal(8,1)  NOT NULL,
    diameterLoad int  NOT NULL,
    cuttBladeSpeed int  NOT NULL,
    cuttRotatSpeed int  NOT NULL,
    cuttFinishTime int  NOT NULL,
    cabAirTempSett int  NOT NULL,
    cabAirTempAlm int  NOT NULL,
    optCarbon tinyint  NOT NULL,
    optCoreless tinyint  NOT NULL,
    CONSTRAINT Recipe_pk PRIMARY KEY  (id)
);

-- Table: Role
CREATE TABLE Role (
    id int  NOT NULL,
    name varchar(30)  NOT NULL,
    CONSTRAINT Role_pk PRIMARY KEY  (id)
);

-- Table: Scrap
CREATE TABLE Scrap (
    id smallint  NOT NULL,
    reason varchar(50)  NOT NULL,
    CONSTRAINT Scrap_pk PRIMARY KEY  (id)
);

-- Table: ScrapRaport
CREATE TABLE ScrapRaport (
    id int  NOT NULL,
    MachineWorkCycles_id bigint  NOT NULL,
    timestart datetime  NOT NULL,
    User_id int  NOT NULL,
    quantity smallint  NOT NULL,
    Scrap_id smallint  NOT NULL,
    CONSTRAINT ScrapRaport_pk PRIMARY KEY  (id)
);

-- Table: SetupInspection
CREATE TABLE SetupInspection (
    QualityControl_id bigint  NOT NULL,
    supervisor int  NOT NULL,
    CONSTRAINT SetupInspection_pk PRIMARY KEY  (QualityControl_id)
);

-- Table: Stops
CREATE TABLE Stops (
    id smallint  NOT NULL,
    reason varchar(50)  NOT NULL,
    CONSTRAINT Stops_pk PRIMARY KEY  (id)
);

-- Table: User
CREATE TABLE "User" (
    id int  NOT NULL,
    fname varchar(20)  NOT NULL,
    sname varchar(40)  NOT NULL,
    login varchar(20)  NULL,
    password_hash text  NULL,
    role_id int  NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY  (id)
);

-- Table: Visualization
CREATE TABLE Visualization (
    id smallint  NOT NULL,
    machine_code varchar(5)  NOT NULL,
    iOn bit  NOT NULL,
    iTemp bit  NOT NULL,
    iQi bit  NOT NULL,
    IData bit  NOT NULL,
    i1Cycle bit  NOT NULL,
    iAlarm bit  NOT NULL,
    iWork bit  NOT NULL,
    stopTime varchar(20)  NOT NULL,
    qtyLeft int  NOT NULL,
    progress smallint  NOT NULL,
    timeLeft varchar(20)  NOT NULL,
    cycleTime varchar(20)  NOT NULL,
    worksOrder varchar(40)  NOT NULL,
    partNumber varchar(40)  NOT NULL,
    recipe varchar(50)  NOT NULL,
    operator varchar(50)  NOT NULL,
    efficiency int  NOT NULL,
    iClean bit  NOT NULL,
    iAss bit  NOT NULL,
    CONSTRAINT Visualization_pk PRIMARY KEY  (id)
);

-- foreign keys
-- Reference: AlarmRaport_Alarms (table: AlarmRaport)
ALTER TABLE AlarmRaport ADD CONSTRAINT AlarmRaport_Alarms
    FOREIGN KEY (Alarms_id)
    REFERENCES Alarms (id);

-- Reference: AlarmRaport_Machine (table: AlarmRaport)
ALTER TABLE AlarmRaport ADD CONSTRAINT AlarmRaport_Machine
    FOREIGN KEY (Machine_id)
    REFERENCES Machine (id);

-- Reference: AlarmRaport_User (table: AlarmRaport)
ALTER TABLE AlarmRaport ADD CONSTRAINT AlarmRaport_User
    FOREIGN KEY (User_id)
    REFERENCES "User" (id);

-- Reference: MachineConfig_QualityControl (table: SetupInspection)
ALTER TABLE SetupInspection ADD CONSTRAINT MachineConfig_QualityControl
    FOREIGN KEY (QualityControl_id)
    REFERENCES QualityInspection (id);

-- Reference: MachineWorkCycle_Recipes (table: MachineWorkCycle)
ALTER TABLE MachineWorkCycle ADD CONSTRAINT MachineWorkCycle_Recipes
    FOREIGN KEY (Recipe_id)
    REFERENCES Recipe (id);

-- Reference: MachineWorkCycle_Stops (table: MachineWorkCycle)
ALTER TABLE MachineWorkCycle ADD CONSTRAINT MachineWorkCycle_Stops
    FOREIGN KEY (Stops_id)
    REFERENCES Stops (id);

-- Reference: MachineWorkCycle_User (table: MachineWorkCycle)
ALTER TABLE MachineWorkCycle ADD CONSTRAINT MachineWorkCycle_User
    FOREIGN KEY (User_id)
    REFERENCES "User" (id);

-- Reference: MachineWorkCycles_Machine (table: MachineWorkCycle)
ALTER TABLE MachineWorkCycle ADD CONSTRAINT MachineWorkCycles_Machine
    FOREIGN KEY (Machine_id)
    REFERENCES Machine (id);

-- Reference: Menu_Role_Menu (table: Menu_Role)
ALTER TABLE Menu_Role ADD CONSTRAINT Menu_Role_Menu
    FOREIGN KEY (Menu_id)
    REFERENCES Menu (id);

-- Reference: Menu_Role_Role (table: Menu_Role)
ALTER TABLE Menu_Role ADD CONSTRAINT Menu_Role_Role
    FOREIGN KEY (Role_id)
    REFERENCES Role (id);

-- Reference: QualityControl_MachineWorkCycles (table: QualityInspection)
ALTER TABLE QualityInspection ADD CONSTRAINT QualityControl_MachineWorkCycles
    FOREIGN KEY (MachineWorkCycles_id)
    REFERENCES MachineWorkCycle (id);

-- Reference: QualityInspection_User (table: QualityInspection)
ALTER TABLE QualityInspection ADD CONSTRAINT QualityInspection_User
    FOREIGN KEY (User_id)
    REFERENCES "User" (id);

-- Reference: Recipes_Machine (table: Recipe)
ALTER TABLE Recipe ADD CONSTRAINT Recipes_Machine
    FOREIGN KEY (Machine_id)
    REFERENCES Machine (id);

-- Reference: Recipes_User (table: Recipe)
ALTER TABLE Recipe ADD CONSTRAINT Recipes_User
    FOREIGN KEY (User_id)
    REFERENCES "User" (id);

-- Reference: ScrapRaport_MachineWorkCycles (table: ScrapRaport)
ALTER TABLE ScrapRaport ADD CONSTRAINT ScrapRaport_MachineWorkCycles
    FOREIGN KEY (MachineWorkCycles_id)
    REFERENCES MachineWorkCycle (id);

-- Reference: ScrapRaport_Scrap (table: ScrapRaport)
ALTER TABLE ScrapRaport ADD CONSTRAINT ScrapRaport_Scrap
    FOREIGN KEY (Scrap_id)
    REFERENCES Scrap (id);

-- Reference: ScrapRaport_User (table: ScrapRaport)
ALTER TABLE ScrapRaport ADD CONSTRAINT ScrapRaport_User
    FOREIGN KEY (User_id)
    REFERENCES "User" (id);

-- Reference: SetupInspection_User (table: SetupInspection)
ALTER TABLE SetupInspection ADD CONSTRAINT SetupInspection_User
    FOREIGN KEY (supervisor)
    REFERENCES "User" (id);

-- Reference: User_Role (table: User)
ALTER TABLE "User" ADD CONSTRAINT User_Role
    FOREIGN KEY (role_id)
    REFERENCES Role (id);







INSERT INTO Role VALUES (1, 'Rola1')

INSERT INTO [User] VALUES (1, 'Obi', 'Kenobi', 'login1', 'rtdfghrtyfhgb', 1)

INSERT INTO Machine VALUES (1, 'MCH1')

INSERT INTO Recipe VALUES (1, 1, 1, current_timestamp, 1, '54MPL3', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (2, 1, 1, current_timestamp, 1, '54MPL32', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (3, 1, 1, current_timestamp, 1, '54MPL33', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (4, 1, 1, current_timestamp, 1, '54MPL34', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (5, 1, 1, current_timestamp, 1, '54MPL35', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (6, 1, 1, current_timestamp, 1, '54MPL36', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (7, 1, 1, current_timestamp, 1, '54MPL37', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (8, 1, 1, current_timestamp, 1, '54MPL38', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (9, 1, 1, current_timestamp, 1, '54MPL39', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (10, 1, 1, current_timestamp, 1, '54MPL310', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (11, 1, 1, current_timestamp, 1, '54MPL311', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (12, 1, 1, current_timestamp, 1, '54MPL312', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (13, 1, 1, current_timestamp, 1, '54MPL313', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (14, 1, 1, current_timestamp, 1, '54MPL314', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (15, 1, 1, current_timestamp, 1, '54MPL315', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (16, 1, 1, current_timestamp, 1, '54MPL316', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (17, 1, 1, current_timestamp, 1, '54MPL317', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
INSERT INTO Recipe VALUES (18, 1, 1, current_timestamp, 1, '54MPL318', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
