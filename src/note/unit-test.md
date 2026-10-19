---
title: Unit Test
---

# TDD（测试驱动开发）

TDD（Test-Driven Development）是一种开发节奏：先根据一个小需求写测试，确认它因尚未实现的行为而失败，再写刚好能让测试通过的代码，最后整理代码。测试用来明确预期行为，并引导下一步实现。

## 红—绿—重构

1. **红**：把需求拆成一个可验证的行为，编写测试并运行，确认它按预期失败。
2. **绿**：只实现当前行为，运行测试直到通过。
3. **重构**：在测试保持通过的前提下，改进命名、结构或重复代码；之后选择下一个行为，重复循环。

## Java 示例

假设项目已引入 JUnit Jupiter，要实现 `Calculator.add`。先写测试：

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class CalculatorTest {
    @Test
    void addsTwoNumbers() {
        assertEquals(5, new Calculator().add(2, 3));
    }
}
```

先给 `add` 一个返回 `0` 的实现，运行测试会得到“期望 5，实际 0”（红）。然后改成最小的正确实现：

```java
class Calculator {
    int add(int a, int b) {
        return a + b;
    }
}
```

再次运行测试，结果通过（绿）。这个例子很小，无须强行重构；后续可为 `0`、负数等情况补充测试，每次只推进一个行为。

## 适用方式与注意点

- 把需求拆成可验证的小行为，有助于明确接口和预期结果；持续运行测试也能及时发现回归。
- 测试应验证对外行为，而不是固定内部实现，否则重构会变得困难。
- 拆分需求和维护测试需要时间；测试通过只说明已覆盖的场景通过，不能保证没有遗漏或缺陷。
