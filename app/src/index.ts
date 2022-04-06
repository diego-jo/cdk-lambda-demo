import { SQSEvent, SQSRecord } from 'aws-lambda'

export const handler = (event: SQSEvent): SQSRecord => {
  console.log(event.Records[0])
  return event.Records[0]
}
