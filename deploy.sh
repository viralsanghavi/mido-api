#!/usr/bin/env bash

ENV="prod"
REGION="ap-south-1"
STACK_NAME="mido-api-stack-$ENV"
MIDO_CF_BUCKET_NAME="mido-gift-cf-$ENV-code-deploy"

sam build --parameter-overrides "ParameterKey=EnvStageName,ParameterValue=$ENV ParameterKey=Region,ParameterValue=$REGION"

sam package --output-template-file packaged.yaml --s3-bucket "$MIDO_CF_BUCKET_NAME"

sam deploy --template-file packaged.yaml --stack-name $STACK_NAME --region $REGION --s3-bucket "$MIDO_CF_BUCKET_NAME" --capabilities CAPABILITY_NAMED_IAM