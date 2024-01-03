import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  //   search query
  search(searchableFields: string[]) {
    const { searchTerm } = this.query;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  //   filter query
  filter() {
    const queryObject = { ...this.query };
    // remove unwanted fields
    const excludeFields = ["searchTerm", "limit", "sort", "page", "fields"];
    excludeFields.forEach((field) => delete queryObject[field]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }

  //   sort query
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  //   limit query
  limit() {
    const limit = Number(this?.query?.limit) || 10;
    this.modelQuery = this.modelQuery.limit(limit);
    return this;
  }
  // pagination query
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // field limiting
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
