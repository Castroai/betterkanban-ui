#!/bin/bash

echo "Deploying Container to AWS Container Registry : Started"

echo "Login to registry:started (1/4)"

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/f1z9f8i1
echo "Login to registry started : Sucessfull"
echo "Building Image: started (2/4)"


docker build -t betterkanban-dev .
echo "Building Image:Sucessfull"

echo "Tagging Image:started (3/4)"

docker tag betterkanban-dev:latest public.ecr.aws/f1z9f8i1/betterkanban-dev:latest

echo "Deploying Image:started (4/4)"

docker push public.ecr.aws/f1z9f8i1/betterkanban-dev:latest
echo "Deploying Image:Sucessfully (4/4)"

echo "Deploying Container to AWS Container Registry : Finished"

