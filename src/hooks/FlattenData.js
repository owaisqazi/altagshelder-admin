export const flattenCompanyData = (data) => {
  let flattenedData = {};

  // Flatten main keys
  Object.keys(data).forEach((key) => {
    if (key === "documents" || key === "state_served") {
      // Do not flatten the 'documents' key
      flattenedData[key] = data[key];
    } else if (
      typeof data[key] === "object" &&
      data[key] !== null &&
      !Array.isArray(data[key])
    ) {
      // Flatten nested object keys, but not arrays
      Object.keys(data[key]).forEach((nestedKey) => {
        flattenedData[nestedKey] = data[key][nestedKey];
      });
    } else {
      flattenedData[key] = data[key];
    }
  });

  return flattenedData;
};
