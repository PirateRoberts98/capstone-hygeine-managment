import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="capstone-hygeine_tracker-team2", # Replace with your own username
    version="0.0.1",
    author="Robert ,Alanna ,Scott ,James ,Mike, Nitika",
    author_email="rconr060@uottawa.ca",
    description="Capstone Project for CEG4912/13",
    url="https://github.com/PirateRoberts98/capstone-hygeine-managment",
    packages=setuptools.find_packages(),
    classifiers=[
        "School"
    ],
    python_requires='>=3.6',
)