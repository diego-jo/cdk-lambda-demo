import {
  Stack,
  StackProps,
  aws_lambda as lambda,
  aws_sqs as sqs,
  aws_ssm as ssm
} from 'aws-cdk-lib'
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources'
import { Construct } from 'constructs'

export class LambdaStack extends Stack {
  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const lambdaExample = new lambda.Function(this, 'lambda-example', {
      runtime: lambda.Runtime.NODEJS_14_X,
      functionName: 'lambda-example',
      code: new lambda.AssetCode('../app/dist'),
      handler: 'index.handler'
    })

    const queueArn = ssm.StringParameter.fromStringParameterName(this, 'queue-ssm', '/project/squad/app/demo-queue2')
    const queue = sqs.Queue.fromQueueArn(this, 'demo-queue2', queueArn.stringValue)
    const queueEventSource = new SqsEventSource(queue)
    lambdaExample.addEventSource(queueEventSource)
  }
}
