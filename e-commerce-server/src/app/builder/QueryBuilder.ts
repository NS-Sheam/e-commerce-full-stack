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
  // Price range query
  priceRange() {
    const minPrice = Number(this?.query?.minPrice);
    const maxPrice = Number(this?.query?.maxPrice);

    if (minPrice && maxPrice) {
      this.modelQuery = this.modelQuery.find({
        price: { $gte: minPrice, $lte: maxPrice },
      });
    } else if (minPrice) {
      this.modelQuery = this.modelQuery.find({ price: { $gte: minPrice } });
    } else if (maxPrice) {
      this.modelQuery = this.modelQuery.find({ price: { $lte: maxPrice } });
    }

    return this;
  }

  //   filter query
  filter() {
    const queryObject = { ...this.query };

    // remove unwanted fields
    const excludeFields = [
      "searchTerm",
      "limit",
      "sort",
      "page",
      "fields",
      "minPrice",
      "maxPrice",
    ];

    excludeFields.forEach((field) => delete queryObject[field]);

    // Get the remaining query fields
    const fields = Object.entries(queryObject);

    // Create an array of objects for each key-value pair
    const fieldQuery = fields
      .map(([key, value]) => {
        const values = Array.isArray(value)
          ? value
          : (value as string).split(",");
        return values.map((v) => ({ [key]: v.trim() }));
      })
      .flat();

    this.modelQuery = this.modelQuery.find({
      $or: fieldQuery as FilterQuery<T>[],
    });
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
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();

    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
    };
  }
}

export default QueryBuilder;
