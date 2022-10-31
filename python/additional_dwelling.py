class AdditionalDwellingCondition:

    def __init__(self, additional_dwelling_limit, additional_dwelling_rate):
        self.limit = additional_dwelling_limit
        self.rate = additional_dwelling_rate

    def get_limit(self):
        return self.limit
    
    def get_rate(self):
        return self.rate

    def get_additional_dwelling_supplement(self, price):
        
        if price >= self.limit:
                return self.rate*price

        return 0