import unittest
from lbtt_calculator import *
from lbtt_conditions import TaxConditions
from buyer import *

class TestLBTT(unittest.TestCase):


	def test_lbtt_values_scottland_2022(self):

		scottland_2022_conditions = TaxConditions([145000, 250000, 325000, 750000], [175000, 250000, 325000, 750000], [0.02, 0.05, 0.1, 0.12], 40000, 0.04)
		lbtt_calculator = LBTTcalculator(scottland_2022_conditions)

		self.assertEqual(lbtt_calculator.get_LBTT(BuyerConditions(130000, False, False)), 0.0)
		self.assertEqual(lbtt_calculator.get_LBTT(BuyerConditions(150000, False, False)), 100.0)
		self.assertEqual(lbtt_calculator.get_LBTT(BuyerConditions(260000, False, False)), 2600.0)
		self.assertEqual(lbtt_calculator.get_LBTT(BuyerConditions(400000, False, False)), 13350.0)
		self.assertEqual(lbtt_calculator.get_LBTT(BuyerConditions(1000000, False, False)), 78350.0)
		self.assertEqual(lbtt_calculator.get_LBTT(BuyerConditions(130000, True, False)), 0.0)
		self.assertEqual(lbtt_calculator.get_LBTT(BuyerConditions(150000, True, False)), 0.0)
		self.assertEqual(lbtt_calculator.get_LBTT(BuyerConditions(130000, False, True)), 5200.0)
		self.assertEqual(lbtt_calculator.get_LBTT(BuyerConditions(150000, False, True)), 6100.0)

if __name__ == '__main__':

	unittest.main()