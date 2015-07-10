var mongoose = require('mongoose');

// Class schema
var classSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    instructor: {
        type: String
    },
    lessons:[{
        lesson_numer: {type: Number},
        lesson_title: {type: String},
        lesson_body: {type: String}
    }]
});

var Class = module.exports = mongoose.model('Class', classSchema);

// Fetch all classes
module.exports.getClasses = function(callback, limit) {
    Class.find(callback).limit(limit);
}