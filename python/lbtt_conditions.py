class TaxConditions:

    def __init__(self, normal_ranges, ftb_ranges, rates, additional_dwelling_limit, additional_dwelling_rate):
        self.__normal_ranges = normal_ranges
        self.__ftb_ranges = ftb_ranges
        self.__rates = rates

        self.__additional_dwelling_limit = additional_dwelling_limit
        self.__additional_dwelling_rate = additional_dwelling_rate

    def get_ranges(self, is_first_time_buyer):

        if is_first_time_buyer:
            return self.__ftb_ranges

        return self.__normal_ranges

    def get_rates(self):
        return self.__rates

    def get_additional_dwelling_supplement(self, price):
        
        if price >= self.__additional_dwelling_limit:
                return self.__additional_dwelling_rate*price

        return 0