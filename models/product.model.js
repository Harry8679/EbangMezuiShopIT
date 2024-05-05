const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Veuillez entrer le nom du produit'],
        trim: true,
        maxLength: [200, 'Le nom du produit ne peut excéder les 100 caractères.']
    },
    price: {
        type: Number,
        required: [true, 'Veuillez entrer le nom du produit'],
        maxLength: [5, 'Le prix du produit ne peut excéder les 5 chiffres.'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Veuillez entrer la description du produit'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Veuillez choisir la catégorie du produit'],
        enum: {
            values: [
                'Alimentaire',
                'Accessoires',
                'Beauté/Santé',
                'Camera',
                'Ecouteurs',
                'Electronique',
                'Extérieur',
                'Habits/Chaussures',
                'Livres',
                'Maison',
                'Ordinateurs',
                'Sports'
            ],
            message: 'Veuillez choisir une catégorie pour le produit'
        }
    },
    seller: {
        type: String,
        required: [true, 'Veuillez entrer le nom du vendeur']
    },
    stock: {
        type: Number,
        required: [true, 'Entrez le stock du produit'],
        // maxLength: [5, 'Le nombre ne peut excéder 5 chiffres'],
        // default: 0
    },
    numberOfViews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            // name: {
            //     type: String,
            //     required: true
            // },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                require: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);