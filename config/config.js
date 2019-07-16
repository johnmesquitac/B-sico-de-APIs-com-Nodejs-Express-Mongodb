const env = process.env.NODE_ENV || "dev";

const config = () => {
  switch (env) {
    case "dev":
      return {
        db_string: "anonymous",
        jwt_pass: "akira",
        jwt_expires_in: "7d"
      };
    case "hml":
      return {
        db_string: "anonymous",
        jwt_pass: "audhihudhauohfuhfofaofhfofpafpafhp",
        jwt_expires_in: "7d"
      };
    case "prod":
      return {
        db_string: "anonymous",
        jwt_pass: "apidpijfoifnonfoijiapfjai-90ri09293ie092i#$5%3",
        jwt_expires_in: "7d"
      };
  }
};
console.log(`Starting API, environment: ${env.toUpperCase()}`);
module.exports = config();
