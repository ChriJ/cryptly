import * as cryptly from "./index"

describe("Algorithm", () => {
	it("generate AES CBC 256", async () => {
		const algorithm = cryptly.Algorithm.AesCbc(256)
		const key = await algorithm.export()
		expect(key).toHaveLength(43)
	})
	it("encrypt & decrypt AES CBC", async () => {
		const algorithm = cryptly.Algorithm.AesCbc(256)
		const encrypted = await algorithm.encrypt("The meaning of life, the universe and everything.")
		expect(encrypted.salt).toHaveLength(22)
		expect(encrypted.value).toHaveLength(86)
		const decrypted = await algorithm.decrypt(encrypted)
		expect(decrypted).toEqual("The meaning of life, the universe and everything.")
	})
	it("encrypt & decrypt AES CBC with fixed salt", async () => {
		const algorithm = cryptly.Algorithm.AesCbc("VaVdZS5E6s9oEdLonNVTgSKv5zAW0LNvjBSdrmnEBS8")
		const encrypted = await algorithm.encrypt("The meaning of life, the universe and everything.", "K1LVSh3fzl_UTQl02fIMzg")
		expect(encrypted.salt).toEqual("K1LVSh3fzl_UTQl02fIMzg")
		expect(encrypted.value).toEqual("VSzGsuBi-Y2L719u3ALxpvnxeAjfJxwcXsSfJSRtwWYA8-qUXBeyQo6A0ZX7QkDgnTEqM70Cdb1-eVa7izHyFQ")
		expect(await algorithm.encrypt("The meaning of life, the universe and everything.")).not.toEqual(encrypted.value)
		const decrypted = await algorithm.decrypt(encrypted)
		expect(decrypted).toEqual("The meaning of life, the universe and everything.")
	})
})
