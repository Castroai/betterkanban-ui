#!/bin/bash


aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/f1z9f8i1

docker build -t betterkanban-dev .

docker tag betterkanban-dev:latest public.ecr.aws/f1z9f8i1/betterkanban-dev:latest

docker push public.ecr.aws/f1z9f8i1/betterkanban-dev:latest


