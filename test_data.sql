{
  "treeName": "Arbolito",
  "pathPhoto": "/images/trees/arbolito.jpg",
  "cityBlock": 101,
  "perimeter": 10.5,
  "height": 20.0,
  "incline": 2.5,
  "treesInTheBlock": 5,
  "useUnderTheTree": "Shade",
  "frequencyUse": 3,
  "potentialDamage": 500,
  "isMovable": false,
  "isRestrictable": true,
  "isMissing": false,
  "isDead": false,
  "exposedRoots": true,
  "dch": 35,
  "windExposure": "protegido",
  "vigor": "excelente",
  "canopyDensity": "densa",
  "growthSpace": "cazuela > 2 m2",
  "treeValue": "singular",
  "streetMateriality": "asfalto",
  "conflictsNames": ["Conflicto1", "Conflicto2"],
  "defectsDtos": [
    {
      "defectName": "Defecto1",
      "defectValue": 4,
      "textDefectValue": "Moderate",
      "branches": 3
    },
    {
      "defectName": "Defecto2",
      "defectValue": 2,
      "textDefectValue": "Mild"
    }
  ],
  "diseasesNames": ["Enfermedad1", "Enfermedad2"],
  "interventionsNames": ["Intervencion1", "Intervencion2"],
  "pestsNames": ["Plaga1", "Plaga2"],
  "latitude": -34.603722,
  "longitude": -58.381592,
  "projectId": 2,
  "treeTypeName": "Tipo1",
  "risk": 12,
  "address": "direccion1"
}

{
  "userName": "Lorenzo",
  "lastName": "Lopez",
  "email": "lorenzito@example.com",
  "password": "contra",
  "phonenumber": "123456789",
  "address": "123 Main St",
  "cityName": "Santa Fe",
  "provinceName": "Santa Fe",
  "roleName": "Administrador"
}
{
  "email": "lorenzito@example.com",
  "password": "contra"
}

INSERT INTO pests (pest_name) VALUES ('Plaga1'), ('Plaga2');
INSERT INTO conflicts (conflict_name) VALUES ('Conflicto1'), ('Conflicto2');
INSERT INTO diseases (disease_name) VALUES ('Enfermedad1'), ('Enfermedad2');
INSERT INTO interventions (intervention_name) VALUES ('Intervencion1'), ('Intervencion2');
INSERT INTO defects (defect_name, defect_zone) VALUES ('Defecto1', 'raiz'), ('Defecto2', 'tronco');

INSERT INTO tree_types (tree_type_name, gender, species, scientific_name) VALUES 
('Tipo no definido', 'Genero no definido', 'Especie no definida', 'Nombre Cientifico no definido'),
INSERT INTO tree_types (tree_type_name) VALUES 
('solo tipo' )

INSERT INTO provinces (province_name) VALUES 
('Santa Fe');
INSERT INTO cities (city_name,province_id) VALUES  
('Santa Fe',1);
INSERT INTO neighborhoods (neighborhood_name, neighborhood_metres, city_id) VALUES   
('Candioti',10000,1);

INSERT INTO roles (role_name) VALUES ('Administrador');

INSERT INTO projects (project_name, project_description, start_date, end_date, project_type, city_id, user_id) VALUES 
('Proyecto de Reforestación', 'Reforestación en zonas rurales', '2023-01-01', '2024-01-01', TRUE, 1, 1);
INSERT INTO project_user (project_id,user_id) VALUES (2,1);
SELECT * from neighborhoods
SELECT * from trees
SELECT * from coordinates

UPDATE trees SET neighborhood_id = 1 WHERE id_tree = 8;

TRUNCATE TABLE trees CASCADE;
select * from trees