#!/usr/bin/env node
/* eslint-disable no-new */
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { LambdaStack } from '../lib/lambda'

const app = new cdk.App()
new LambdaStack(app, 'lambda-stack')
