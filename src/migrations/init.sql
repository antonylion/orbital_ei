CREATE TABLE images (
    catalog_id SERIAL PRIMARY KEY,
    acquisition_date_start TIMESTAMP NOT NULL,
    acquisition_date_end TIMESTAMP NOT NULL,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

select * from images i;

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