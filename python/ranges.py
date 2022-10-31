class RangesAndRates:
    def __init__(self, regular_ranges, first_time_buyer_ranges, rates):
        self.regular_ranges = regular_ranges
        self.first_time_buyer_ranges = first_time_buyer_ranges
        self.rates = rates

    def get_regular_ranges(self):
        return self.regular_ranges

    def get_first_time_buyer_ranges(self):
        return self.first_time_buyer_ranges

    def get_rates(self):
        return self.rates
    
    def get_ranges(self, first_time):

        if first_time:
            return self.get_first_time_buyer_ranges()

        return self.get_regular_ranges()