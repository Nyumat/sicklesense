#!/bin/bash

export TIMESTAMP=$(date +%s)
docker-compose down -v  # Stop containers and remove volumes
docker-compose -f docker-compose-local.yml up -d    # Start containers with a fresh volume
