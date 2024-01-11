import addressModel from "../models/Address";

class AddressController {
    async addAddress(req, res) {
        const { user_id, addressLine1, addressLine2, city, state, postalCode, country, phone } = req.body;
        try {
            const newAddress = new addressModel({ user_id, addressLine1, addressLine2, city, state, postalCode, country, phone  });
            await newAddress.save();
            res.status(200).send(`Address for user ${user_id} has been successfully added`);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deleteAddress(req, res) {
        const addressId = req.params.id;
        try {
            const deletedAddress = await addressModel.findByIdAndDelete(addressId);
            if (deletedAddress) {
                res.status(200).send(`Address has been successfully deleted`);
            } else {
                res.status(400).send('Address not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getAddressById(req, res) {
        try {
            const address = await addressModel.findById(req.params.id);
            if (address) {
                res.status(200).send(address);
            } else {
                res.status(400).send("Address not found");
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateAddressById(req, res) {
        try {
            const addressId = req.params.id;
            const newAddressDetails = req.body;

            const updatedAddress = await addressModel.findByIdAndUpdate(addressId, newAddressDetails, { new: true });
            if (!updatedAddress) {
                return res.status(404).send("Address not found");
            }
            res.send(updatedAddress);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

export default new AddressController();
