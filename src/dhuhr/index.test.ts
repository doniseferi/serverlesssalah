import { Context } from "@azure/functions";
import { HttpRequest } from "@azure/functions";
import { Substitute } from "@fluffy-spoon/substitute";
import dhuhr from "./index";

describe.each([
  ["2020-06-08",200],
  ["20200608", 200],
  ["1987-01-27", 200],
  ["19870127", 200],
  ["2016-02-29", 200],
  ["20160229", 200],
  ["2014-29-02", 400],
  ["2020-06-06-02", 400 ],
  ["2020060", 400 ],
  ["202006", 400 ],
  ["20200", 400 ],
  ["2020", 400 ],
  ["2020-06-0", 400 ],
  ["2020-06", 400 ],
  ["1020-0", 400 ],
  ["2020", 400 ],
  ["abc", 400],
  ["20bc", 400]
])("dhuhr function", (date, statusCode) => {
  test(`accepts iso 8601 date format '${date}' as a parameter`, async () => {
    const request = Substitute.for<HttpRequest>();
    (request.params.returns as any)({ date: date });
    (request.body.returns as any)({});

    const context = Substitute.for<Context>();
    (context.req as any).returns({ req: request });

    const response = await dhuhr(context, request);

    expect(response.status).toBe(statusCode);
  });
});