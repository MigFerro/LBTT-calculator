#https://www.gov.scot/policies/taxes/land-and-buildings-transaction-tax/
#https://revenue.scot/calculate-tax/calculate-property-transactions



class LBTTcalculator:

	def __init__(self, tax_conditions):

		self.tax_conditions = tax_conditions



	def get_LBTT(self, buyer_conditions):

		ranges = self.tax_conditions.get_ranges(buyer_conditions.is_first_time_buyer())
		rates = self.tax_conditions.get_rates()
		price = buyer_conditions.get_price()

		lbtt = 0

		if buyer_conditions.is_additional_dwelling():
			lbtt += self.tax_conditions.get_additional_dwelling_supplement(price)

		if self.price_above_all_ranges(ranges, price):
			lbtt += self.lbtt_for_price_above_ranges(ranges, rates, price)
			return lbtt 
		
		if self.price_above_any_range(ranges, price):
			lbtt += self.lbtt_for_price_above_any_range(ranges, rates, price)
			return lbtt

		return lbtt


	def lbtt_for_price_above_any_range(self, ranges, rates, price):
		lbtt = 0
		for i in range(1, len(ranges)):
			if price<ranges[i]:
				lbtt += (price-ranges[i-1])*rates[i-1]
				break
			else:
				lbtt += (ranges[i]-ranges[i-1])*rates[i-1]
		return lbtt

	def price_above_any_range(self, ranges, price):
		return price > ranges[0]

	def lbtt_for_price_above_ranges(self, ranges, rates, price):
		return sum([(ranges[i+1]-ranges[i])*rates[i] for i in range(len(rates)-1)]) + (price-ranges[-1])*rates[-1]

	def price_above_all_ranges(self, ranges, price):
		return price>ranges[-1]
