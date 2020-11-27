import unittest
from alarm import waterTemperature, humidityLevel, timesEntered, timesUsed


class TestAlarm(unittest.TestCase):

    def test_waterTemperature(self):
        waterTemperature(1, 1)
        result = waterTemperature(1, 120000000)
        self.assertEqual(result['status'], True)

        waterTemperature(50, 1)
        result = waterTemperature(50, 120000000)
        self.assertEqual(result['status'], True)

        waterTemperature(1, 1)
        result = waterTemperature(50, 120000000)
        self.assertEqual(result['status'], True)

        waterTemperature(50, 1)
        result = waterTemperature(1, 120000000)
        self.assertEqual(result['status'], True)

        waterTemperature(18, 1)
        result = waterTemperature(19, 120000000)
        self.assertEqual(result['status'], False)

        waterTemperature(50, 1)
        result = waterTemperature(19, 120000000)
        self.assertEqual(result['status'], False)

        waterTemperature(1, 1)
        result = waterTemperature(19, 120000000)
        self.assertEqual(result['status'], False)

    def test_timesEntered(self):
        timesEntered(True, 1)
        result = timesEntered(True, 172800000000)
        self.assertEqual(result['status'], True)

        timesEntered(False, 1)
        result = timesEntered(False, 172800000000)
        self.assertEqual(result['status'], True)

        timesEntered(True, 1)
        timesEntered(True, 2)
        timesEntered(True, 3)
        timesEntered(True, 4)
        timesEntered(True, 5)
        result = timesEntered(True, 172800000000)
        self.assertEqual(result['status'], False)

        timesEntered(True, 1)
        timesEntered(True, 2)
        timesEntered(True, 3)
        timesEntered(True, 4)
        timesEntered(True, 5)
        timesEntered(True, 6)
        result = timesEntered(True, 172800000000)
        self.assertEqual(result['status'], False)

    def test_humidityLevel(self):
        result = humidityLevel(34)
        self.assertEqual(result['status'], True)

        result = humidityLevel(76)
        self.assertEqual(result['status'], True)

        result = humidityLevel(44)
        self.assertEqual(result['status'], False)

    def test_timesUsed(self):
        timesUsed(True, 1)
        result = timesUsed(True, 172800000000)
        self.assertEqual(result['status'], False)

        timesUsed(False, 1)
        result = timesUsed(False, 172800000000)
        self.assertEqual(result['status'], False)

        timesUsed(True, 1)
        timesUsed(True, 2)
        result = timesUsed(True, 172800000000)
        self.assertEqual(result['status'], False)


if __name__ == '__main__':
    unittest.main()
