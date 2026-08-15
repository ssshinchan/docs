# Java

## 字符串

### ⭐String、StringBuffer、StringBuilder的区别

| 特性     | String | StringBuffer | StringBuilder |
| -------- | ------ | ------------ | ------------- |
| 可变性   | ×      | √            | √             |
| 线程安全 | √      | √            | ×             |
| 性能     | 较低   | 较高         | 高            |

- **可变性**

  String 是不可变的（后面会详细分析原因），每次修改都会生成新的对象，并将引用指向新的实例，而 StringBuffer 和 StringBuilder 都是可变的，它们在修改字符串时不会创建新对象，而是直接在原有字符数组上进行操作。

  StringBuilder 与 StringBuffer 都继承自 AbstractStringBuilder 类，在 AbstractStringBuilder 中也是使用字符数组保存字符串，不过没有使用 final 和 private 关键字修饰，最关键的是这个 AbstractStringBuilder 类还提供了很多修改字符串的方法比如 append 方法。

  ```java
  abstract class AbstractStringBuilder implements Appendable, CharSequence {
      char[] value;
      public AbstractStringBuilder append(String str) {
          if (str == null)
              return appendNull();
          int len = str.length();
          ensureCapacityInternal(count + len);
          str.getChars(0, len, value, count);
          count += len;
          return this;
      }
      //...
  }
  ```

- **线程安全性**

  String 中的对象是不可变的，也就可以理解为常量，线程安全。AbstractStringBuilder 是 StringBuilder 与 StringBuffer 的公共父类，定义了一些字符串的基本操作，如 expandCapacity、append、insert、indexOf 等公共方法。StringBuffer 对方法加了同步锁或者对调用的方法加了同步锁，所以是线程安全的。StringBuilder 并没有对方法进行加同步锁，所以是非线程安全的。

  ![StringBuffer 方法](https://oss.javaguide.cn/github/javaguide/java/basis/stringbuffer-methods.png)

- **性能**

  两者的性能差异主要来源于线程安全机制：

  - StringBuffer 的方法通常是同步的（线程安全），因此会带来一定的性能开销；
  - StringBuilder 没有同步开销（非线程安全），在单线程场景下通常具有更好的性能表现。相同情况下使用 StringBuilder 相比使用 StringBuffer 仅能获得 10%~15% 左右的性能提升，但却要冒多线程不安全的风险。另外，具体的性能差异并不是固定的，在现代 JVM 中由于锁优化（如锁消除），两者在某些场景下性能差距可能较小。
  

  对于三者使用的总结：

  - 操作少量的数据：适用 String
  - 单线程操作字符串缓冲区下操作大量数据：适用 StringBuilder
  - 多线程操作字符串缓冲区下操作大量数据：适用 StringBuffer
