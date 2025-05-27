// const mongoose = require("mongoose");

// const serviceSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 3,
//       maxlength: 100,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 10,
//     },
//     sections: [
//       {
//         type: String,
//         enum: ["logo", "poster", "social media", "advertising"], // Update as per your use-case
//       },
//     ],
//     image: {
//       type: String,
//       required: true,
//       match: /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/, // Valid image URL check
//     },

//     // Soft delete
//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },

//     // Audit trail
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     updatedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// //
// // 🔹 Indexing for search performance
// //
// serviceSchema.index({ name: 1 });

// //
// // 🔹 Virtual field: slug
// //
// serviceSchema.virtual("slug").get(function () {
//   return this.name.toLowerCase().replace(/ /g, "-");
// });

// //
// // 🔹 Pre-save hook: trim name, logging or sanitization
// //
// serviceSchema.pre("save", function (next) {
//   this.name = this.name.trim();
//   next();
// });

// //
// // 🔹 Instance method: get short description
// //
// serviceSchema.methods.getShortDescription = function () {
//   return this.description.length > 100
//     ? this.description.slice(0, 100) + "..."
//     : this.description;
// };

// //
// // 🔹 Static method: find by section
// //
// serviceSchema.statics.findBySection = function (section) {
//   return this.find({ sections: section, isDeleted: false });
// };

// //
// // 🔹 Static method: pagination
// //
// serviceSchema.statics.paginate = async function (page = 1, limit = 10) {
//   const skip = (page - 1) * limit;
//   const data = await this.find({ isDeleted: false }).skip(skip).limit(limit);
//   const total = await this.countDocuments({ isDeleted: false });
//   return {
//     data,
//     total,
//     page,
//     pages: Math.ceil(total / limit),
//   };
// };

// //
// // 🔹 Hide __v and internal fields
// //
// serviceSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.__v;
//   return obj;
// };

// module.exports = mongoose.model("Service", serviceSchema);

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    sections: [
      {
        type: String,
        enum: ["logo", "poster", "social media", "advertising"], // Update as per your use-case
      },
    ],
    image: {
      type: String,
      required: true,
      match: /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/, // Valid image URL check
    },

    // 🟢 New field: Save slug in DB
    slug: {
      type: String,
      unique: true,
    },

    // 🟢 New field: status
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },

    // Soft delete
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // Audit trail
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//
// 🔹 Indexing for search performance
//
serviceSchema.index({ name: 1 });

//
// 🟢 Full-text search index
//
serviceSchema.index({ name: "text", description: "text" });

//
// 🔹 Virtual field: slug (still useful if you need runtime only)
//
serviceSchema.virtual("slugVirtual").get(function () {
  return this.name.toLowerCase().replace(/ /g, "-");
});

//
// 🔹 Pre-save hook: trim name, logging, slug create
//
serviceSchema.pre("save", function (next) {
  this.name = this.name.trim();
  this.slug = this.name.toLowerCase().replace(/ /g, "-");
  next();
});

//
// 🔹 Instance method: get short description
//
serviceSchema.methods.getShortDescription = function () {
  return this.description.length > 100
    ? this.description.slice(0, 100) + "..."
    : this.description;
};

//
// 🔹 Static method: find by section
//
serviceSchema.statics.findBySection = function (section) {
  return this.find({ sections: section, isDeleted: false });
};

//
// 🔹 Static method: pagination
//
serviceSchema.statics.paginate = async function (page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const data = await this.find({ isDeleted: false })
    .skip(skip)
    .limit(limit);
  const total = await this.countDocuments({ isDeleted: false });
  return {
    data,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

//
// 🟢 Static method: full-text search
//
serviceSchema.statics.search = function (query) {
  return this.find({
    $text: { $search: query },
    isDeleted: false,
  });
};

//
// 🔹 Hide __v and internal fields
//
serviceSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("Service", serviceSchema);
