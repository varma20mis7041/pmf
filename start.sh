#!/bin/bash


docker compose up --build 
cd ./apps/web/pmf-assess && npx npm run dev
cd ./apps/web/pmf-assess-backend && npx bun --watch index.ts

