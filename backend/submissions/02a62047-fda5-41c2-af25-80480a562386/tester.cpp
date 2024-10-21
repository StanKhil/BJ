#include <iostream>
using namespace std;
int main() {
int a, b, user;
cin >> a >> b >> user;
if (a + b == user) {
cout << "OK";
} else {
cout << "WA";
}
return 0;
}