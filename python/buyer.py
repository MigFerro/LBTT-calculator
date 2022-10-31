class BuyerConditions:

    def __init__(self, price, is_first_time_buyer, is_additional_dwelling):
        self.__price = price
        self.__is_first_time_buyer = is_first_time_buyer
        self.__is_additional_dwelling = is_additional_dwelling

    def is_first_time_buyer(self):
        return self.__is_first_time_buyer
    
    def is_additional_dwelling(self):
        return self.__is_additional_dwelling

    def get_price(self):
        return self.__price