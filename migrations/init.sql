CREATE TABLE images (
    catalog_id SERIAL PRIMARY KEY,
    acquisition_date_start TIMESTAMP WITH TIME ZONE NOT NULL,
    acquisition_date_end TIMESTAMP WITH TIME ZONE NOT NULL,
    off_nadir DECIMAL(5,2) NOT NULL,
    resolution DECIMAL(5,2) NOT NULL,
    cloud_coverage DECIMAL(5,2) NOT NULL,
    sensor VARCHAR(50) NOT NULL,
    scan_direction VARCHAR(50) NOT NULL,
    satellite_elevation DECIMAL(5,2) NOT NULL,
    image_bands VARCHAR(50) NOT NULL,
    geometry geometry(Polygon, 4326) NOT NULL
);

create type PAYMETHOD as enum (
  'Bank Transfer',
  'Credit Card',
  'PayPal'
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    image_id INT REFERENCES images(catalog_id),
    customer_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    payment_method PAYMETHOD NOT NULL
);

-- From challenge document
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:14:26.000Z',
    '2023-09-22T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[11.410587273581342,48.21262399691764],[11.410587273581342,48.065735886535606],[11.676255131610162,48.065735886535606],[11.676255131610162,48.21262399691764],[11.410587273581342,48.21262399691764]]]}')
);

-- Bucchianico
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:14:26.000Z',
    '2023-09-22T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              14.17768080031351,
              42.30719662567196
            ],
            [
              14.17768080031351,
              42.302159513261785
            ],
            [
              14.184789540083273,
              42.302159513261785
            ],
            [
              14.184789540083273,
              42.30719662567196
            ],
            [
              14.17768080031351,
              42.30719662567196
            ]
          ]
        ]
	}')
);

-- Square n. 3 - Sulmona
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:14:26.000Z',
    '2023-09-22T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              13.911724348535188,
              42.05739970283332
            ],
            [
              13.911724348535188,
              42.035795644011415
            ],
            [
              13.946340540442094,
              42.035795644011415
            ],
            [
              13.946340540442094,
              42.05739970283332
            ],
            [
              13.911724348535188,
              42.05739970283332
            ]
          ]
        ],
	}')
);

-- Square n.4 - Gilching
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:14:26.000Z',
    '2023-09-22T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              11.273123215661911,
              48.12390499848556
            ],
            [
              11.273123215661911,
              48.09981788487792
            ],
            [
              11.310819277816023,
              48.09981788487792
            ],
            [
              11.310819277816023,
              48.12390499848556
            ],
            [
              11.273123215661911,
              48.12390499848556
            ]
          ]
        ],
	}')
);

-- Square n.5 - Edinburgh
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:14:26.000Z',
    '2023-09-22T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              -3.1982196755885184,
              55.958192218387524
            ],
            [
              -3.1982196755885184,
              55.94708645592996
            ],
            [
              -3.1768217254642934,
              55.94708645592996
            ],
            [
              -3.1768217254642934,
              55.958192218387524
            ],
            [
              -3.1982196755885184,
              55.958192218387524
            ]
          ]
        ]
	}')
);

-- Square n. 6 - Mombasa
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:14:26.000Z',
    '2023-09-22T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              39.658785165865055,
              -4.032999689552739
            ],
            [
              39.658785165865055,
              -4.057217743821909
            ],
            [
              39.68527857081426,
              -4.057217743821909
            ],
            [
              39.68527857081426,
              -4.032999689552739
            ],
            [
              39.658785165865055,
              -4.032999689552739
            ]
          ]
        ]
	}')
);

-- Square n. 7 - Auckland
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:14:26.000Z',
    '2023-09-22T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              174.37262823705737,
              -36.57698162159564
            ],
            [
              174.37262823705737,
              -37.483916368515814
            ],
            [
              175.64437273701037,
              -37.483916368515814
            ],
            [
              175.64437273701037,
              -36.57698162159564
            ],
            [
              174.37262823705737,
              -36.57698162159564
            ]
          ]
        ]
	}')
);

-- Square n. 8 - Svalbard
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:14:26.000Z',
    '2023-09-22T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              17.63556367830381,
              79.11188816450067
            ],
            [
              17.63556367830381,
              78.1707945415736
            ],
            [
              23.06056578901928,
              78.1707945415736
            ],
            [
              23.06056578901928,
              79.11188816450067
            ],
            [
              17.63556367830381,
              79.11188816450067
            ]
          ]
        ]
	}')
);

-- Square n. 9 Tripoli
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:14:26.000Z',
    '2023-09-22T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              13.157271248248492,
              32.912668605830476
            ],
            [
              13.157271248248492,
              32.86800434633932
            ],
            [
              13.20980912987335,
              32.86800434633932
            ],
            [
              13.20980912987335,
              32.912668605830476
            ],
            [
              13.157271248248492,
              32.912668605830476
            ]
          ]
        ]
	}')
);

-- Square n.10 - Seoul
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:14:26.000Z',
    '2023-09-22T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              126.96890122466726,
              37.572971566638486
            ],
            [
              126.96890122466726,
              37.558001436422515
            ],
            [
              126.98808369881925,
              37.558001436422515
            ],
            [
              126.98808369881925,
              37.572971566638486
            ],
            [
              126.96890122466726,
              37.572971566638486
            ]
          ]
        ]
	}')
);

INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2024-01-18T11:14:26.000Z',
    '2024-01-18T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'SEN2',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              126.96890122466726,
              37.572971566638486
            ],
            [
              126.96890122466726,
              37.558001436422515
            ],
            [
              126.98808369881925,
              37.558001436422515
            ],
            [
              126.98808369881925,
              37.572971566638486
            ],
            [
              126.96890122466726,
              37.572971566638486
            ]
          ]
        ]
	}')
);

INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2025-03-18T11:14:26.000Z',
    '2025-03-18T11:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'SEN2',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              -3.1982196755885184,
              55.958192218387524
            ],
            [
              -3.1982196755885184,
              55.94708645592996
            ],
            [
              -3.1768217254642934,
              55.94708645592996
            ],
            [
              -3.1768217254642934,
              55.958192218387524
            ],
            [
              -3.1982196755885184,
              55.958192218387524
            ]
          ]
        ]
	}')
);

INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2025-02-18T11:14:26.000Z',
    '2025-02-18T11:14:33.000Z',
    12.59,
    0.33,
    12.65,
    'SEN2',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              -3.1982196755885184,
              55.958192218387524
            ],
            [
              -3.1982196755885184,
              55.94708645592996
            ],
            [
              -3.1768217254642934,
              55.94708645592996
            ],
            [
              -3.1768217254642934,
              55.958192218387524
            ],
            [
              -3.1982196755885184,
              55.958192218387524
            ]
          ]
        ]
	}')
);

-- Square n.11 - Cape Town
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2025-09-12T13:14:26.000Z',
    '2025-09-12T13:14:33.000Z',
    12.59,
    0.33,
    31.02,
    'WV03',
    'Reverse',
    76.17,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              18.362296572818735,
              -33.885930464940074
            ],
            [
              18.362296572818735,
              -33.96712060975035
            ],
            [
              18.46554262848457,
              -33.96712060975035
            ],
            [
              18.46554262848457,
              -33.885930464940074
            ],
            [
              18.362296572818735,
              -33.885930464940074
            ]
          ]
        ]
	}')
);

-- Lagos
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-09-22T11:20:10.000Z',
    '2023-09-22T11:20:17.000Z',
    10.23,
    0.40,
    20.15,
    'WV02',
    'Forward',
    78.50,
    'PAN',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              3.3706640571836033,
              6.57395102323909
            ],
            [
              3.104639903752428,
              6.320775142219873
            ],
            [
              3.4716171235856734,
              6.314403986796677
            ],
            [
              3.724806594787708,
              6.569184042116461
            ],
            [
              3.3706640571836033,
              6.57395102323909
            ]
          ]
        ]
	}')
);

-- Brasilia
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-10-15T09:05:35.000Z',
    '2023-10-15T09:05:43.000Z',
    15.75,
    0.25,
    40.12,
    'WV03',
    'Reverse',
    74.00,
    '4-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              -47.93654452640115,
              -15.737167293056288
            ],
            [
              -47.93654452640115,
              -15.849863610967333
            ],
            [
              -47.805420416100674,
              -15.849863610967333
            ],
            [
              -47.805420416100674,
              -15.737167293056288
            ],
            [
              -47.93654452640115,
              -15.737167293056288
            ]
          ]
        ]
	}')
);

-- Bogota
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-10-20T14:12:50.000Z',
    '2023-10-20T14:12:57.000Z',
    8.50,
    0.35,
    25.45,
    'WV01',
    'Forward',
    75.67,
    'PAN',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              -74.12799215332788,
              4.686309285030418
            ],
            [
              -74.11439243673674,
              4.560139194553656
            ],
            [
              -74.02704041093986,
              4.576824127642396
            ],
            [
              -74.0484861178719,
              4.7134172621012596
            ],
            [
              -74.12799215332788,
              4.686309285030418
            ]
          ]
        ]
	}')
);

-- Sacramento
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-11-05T07:32:18.000Z',
    '2023-11-05T07:32:25.000Z',
    11.75,
    0.50,
    15.60,
    'WV02',
    'Reverse',
    79.23,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              -121.54769699224171,
              38.61753286798168
            ],
            [
              -121.54769699224171,
              38.482177685025505
            ],
            [
              -121.37803901264769,
              38.482177685025505
            ],
            [
              -121.37803901264769,
              38.61753286798168
            ],
            [
              -121.54769699224171,
              38.61753286798168
            ]
          ]
        ]
	}')
);

-- Vancouver

INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-11-22T13:45:40.000Z',
    '2023-11-22T13:45:47.000Z',
    9.25,
    0.28,
    32.80,
    'WV03',
    'Forward',
    76.12,
    '4-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              -123.33651826036018,
              49.369153800056296
            ],
            [
              -123.33651826036018,
              49.07089534816174
            ],
            [
              -122.80974135311533,
              49.07089534816174
            ],
            [
              -122.80974135311533,
              49.369153800056296
            ],
            [
              -123.33651826036018,
              49.369153800056296
            ]
          ]
        ]
	}')
);

-- New Dehli
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-12-01T08:15:20.000Z',
    '2023-12-01T08:15:27.000Z',
    14.85,
    0.30,
    18.40,
    'WV01',
    'Forward',
    77.45,
    'PAN',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              77.12880828284216,
              28.676361882457627
            ],
            [
              77.12880828284216,
              28.517060033345373
            ],
            [
              77.33215254813155,
              28.517060033345373
            ],
            [
              77.33215254813155,
              28.676361882457627
            ],
            [
              77.12880828284216,
              28.676361882457627
            ]
          ]
        ]
	}')
);

-- Nazareth
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-12-10T15:05:42.000Z',
    '2023-12-10T15:05:49.000Z',
    7.60,
    0.20,
    12.75,
    'WV03',
    'Reverse',
    74.98,
    '4-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              35.29071608852135,
              32.712829724148065
            ],
            [
              35.31302620508771,
              32.68473189321375
            ],
            [
              35.343683644179805,
              32.709381830199646
            ],
            [
              35.33230093164576,
              32.734024958352705
            ],
            [
              35.29071608852135,
              32.712829724148065
            ]
          ]
        ]
	}')
);

-- Turku
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2023-12-18T10:22:15.000Z',
    '2023-12-18T10:22:22.000Z',
    13.45,
    0.45,
    22.30,
    'WV02',
    'Forward',
    78.01,
    '8-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              22.229258290974542,
              60.46552972918019
            ],
            [
              22.229258290974542,
              60.4231975197481
            ],
            [
              22.318198841247863,
              60.4231975197481
            ],
            [
              22.318198841247863,
              60.46552972918019
            ],
            [
              22.229258290974542,
              60.46552972918019
            ]
          ]
        ]
	}')
);

-- Stockholm
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2024-01-05T11:50:30.000Z',
    '2024-01-05T11:50:37.000Z',
    9.90,
    0.38,
    35.00,
    'WV01',
    'Reverse',
    75.22,
    'PAN',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              18.04471052729619,
              59.335996072364935
            ],
            [
              18.04471052729619,
              59.302407371525334
            ],
            [
              18.109231755527446,
              59.302407371525334
            ],
            [
              18.109231755527446,
              59.335996072364935
            ],
            [
              18.04471052729619,
              59.335996072364935
            ]
          ]
        ]
	}')
);

-- Perth
INSERT INTO images (
	acquisition_date_start,
	acquisition_date_end,
	off_nadir,
	resolution,
	cloud_coverage,
	sensor,
	scan_direction,
	satellite_elevation,
	image_bands,
	geometry
) VALUES (
    '2024-01-12T08:18:50.000Z',
    '2024-01-12T08:18:57.000Z',
    10.50,
    0.32,
    10.60,
    'WV03',
    'Forward',
    79.35,
    '4-BANDS',
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":
		[
          [
            [
              115.7859390600625,
              -31.879539135123984
            ],
            [
              115.7859390600625,
              -32.05974165047872
            ],
            [
              115.99382415220805,
              -32.05974165047872
            ],
            [
              115.99382415220805,
              -31.879539135123984
            ],
            [
              115.7859390600625,
              -31.879539135123984
            ]
          ]
        ]
	}')
);

INSERT INTO orders (
	image_id,
	customer_email,
	payment_method
) VALUES (
    4,
    'antony.zappacosta@oulook.com',
    'Bank Transfer'
);

INSERT INTO orders (
	image_id,
	customer_email,
	payment_method
) VALUES (
    1,
    'antony.zappacosta@oulook.com',
    'Bank Transfer'
);

INSERT INTO orders (
	image_id,
	customer_email,
	payment_method
) VALUES (
    7,
    'antony.zappacosta@oulook.com',
    'PayPal'
);

INSERT INTO orders (
	image_id,
	customer_email,
	payment_method
) VALUES (
    20,
    'antony.zappacosta@gmail.com',
    'Credit Card'
);

INSERT INTO orders (
	image_id,
	customer_email,
	payment_method
) VALUES (
    13,
    'antony.zappacosta@gmail.com',
    'PayPal'
);

INSERT INTO orders (
	image_id,
	customer_email,
	payment_method
) VALUES (
    23,
    'antony.zappacosta@outlook.com',
    'Bank Transfer'
);

INSERT INTO orders (
	image_id,
	customer_email,
  created_at,
	payment_method
) VALUES (
    5,
    'antony@zappacosta.com',
    '2023-09-22T11:14:26.000Z',
    'PayPal'
);