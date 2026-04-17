const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const Cart = require("../models/Cart")

// Add item to cart
router.post("/add", protect, async (req, res) => {
    try {
        const { productId, quantity } = req.body
        let cart = await Cart.findOne({ userId: req.user.id })
        if (!cart) {
            cart = await Cart.create({ userId: req.user.id, item: [{ productId, quantity }] })
        } else {
            const existingItem = cart.item.find(i => i.productId.toString() === productId)
            if (existingItem) {
                existingItem.quantity += quantity || 1
            } else {
                cart.item.push({ productId, quantity: quantity || 1 })
            }
            await cart.save()
        }
        return res.status(200).json({ message: "Item added to cart", cart })
    } catch (err) {
        return res.status(500).json({ message: `Error adding to cart: ${err}` })
    }
})

// Get cart
router.get("/", protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate("item.productId")
        return res.status(200).json(cart || { item: [] })
    } catch (err) {
        return res.status(500).json({ message: `Error fetching cart: ${err}` })
    }
})

// Remove item from cart
router.delete("/remove/:productId", protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id })
        if (!cart) return res.status(404).json({ message: "Cart not found" })
        cart.item = cart.item.filter(i => i.productId.toString() !== req.params.productId)
        await cart.save()
        return res.status(200).json({ message: "Item removed", cart })
    } catch (err) {
        return res.status(500).json({ message: `Error removing item: ${err}` })
    }
})

module.exports = router
