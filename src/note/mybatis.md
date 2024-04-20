# Mybatis

## 传递参数的方法

### 匿名参数 顺序传递参数

```java
List<Employee> selectByGenderAndAge(Short gender,String age );
```

```xml
<select id="selectByGenderAndAge" resultMap="BaseResultMap" >
  select * from employee where gender = #{gender} and age = #{age}
</select>
```

注意这里按参数名去引用的话会报如下错误，mybatis错误提示很细致，这里明确给我们提示，匿名参数只能使用arg1, arg0, param1, param2 类似的形式

这种传参方式的缺点是不够灵活，必须严格按照参数顺序来引用

```BindingException: Parameter 'gender' not found. Available parameters are [arg1, arg0, param1, param2]```

所以正确的引用方式如下：

```xml
  <select id="selectByGenderAndAge" resultMap="BaseResultMap" >
    select *  from employee where gender = #{param1} and age = #{param2}
  </select>
```

### 使用@Param注解
使用@Param注解显示的告诉mybatis参数的名字，这样在xml中就可以按照参数名去引用了
```java
List<Employee> selectByGenderAndAge( @Param("gender") Short gender,@Param("age") String age );
xml
```

```xml
<select id="selectByGenderAndAge" resultMap="BaseResultMap" >
  select * from employee where gender = #{gender} and age = #{age}
</select>
```

### 使用Map传递参数
实际开发中使用map来传递多个参数是一种推荐的方式

```java
List<Employee> selectByMapParams(Map params);
```

```xml
<select id="selectByMapParams" resultMap="BaseResultMap" parameterType="map">
  select * from employee where gender = #{gender} and age = #{age}
</select>
```

### 用java bean传递多个参数

也可以使用bean的方式来传递多个参数，使用时parameterType指定为对应的bean类型即可

```java
List <Employee> selectByBeans(Employee employee);
```

参数的引用直接使用bean的字段

```
<select id="selectByBeans" resultMap="BaseResultMap" parameterType="com.wg.demo.po.Employee">
  select
  *
  from employee where gender = #{gender} and age = #{age}
</select>
```

### 直接使用JSON传递参数
这也是推荐的一种传参方式，controller层收到JSON型数据后，直接传递给mapper层进行查询操作，简单 方便


```java
List <Employee> findByJSONObject(JSONObject params);
```

```xml
<select id="findByJSONObject" resultMap="BaseResultMap" parameterType="com.alibaba.fastjson.JSONObject">
  select
  *
  from employee where gender = #{gender} and age = #{age}
</select>
```

### 传递集合类型参数List、Set、Array

在一些复杂的查询中（如 sql中的 in操作），传统的参数传递已无法满足需求，这时候就要用到List、Set、Array类型的参数传递：

```java
List <Employee> findByList(List list);
```

```xml
  <select id="findByList" resultMap="BaseResultMap" >
SELECT * from employee where age in
    <foreach collection="list" open="(" separator="," close=")" item="age">
      #{age}
    </foreach>
  </select>
```

这里foreach表示循环操作，具体的参数含义如下：

foreach元素的属性主要有 item，index，collection，open，separator，close。  
item表示集合中每一个元素进行迭代时的别名，  
index指定一个名字，用于表示在迭代过程中，每次迭代到的位置，  
open表示该语句以什么开始，  
separator表示在每次进行迭代之间以什么符号作为分隔符，
close表示以什么结束

在使用foreach的时候最关键的也是最容易出错的就是collection属性，该属性是必须指定的，但是在不同情况下，该属性的值是不一样的，主要有一下3种情况：

1. 如果传入的是单参数且参数类型是一个List的时候，collection属性值为list
2. 如果传入的是单参数且参数类型是一个array数组的时候，collection的属性值为array
3. 如果传入的参数是多个的时候，我们就需要把它们封装成一个Map或者Object

### 参数类型为对象+集合

该类参数与java Bean参数形式类似，只不过更复杂一些，如下面的Department类，除了基本字段还包括一个Employee的列表

```java
@Data
public class Department {
    private Long id;
    private String deptName;
    private String descr;
    private Date createTime;
    List<Employee> employees;
}
```

```java
List <Employee> findByDepartment(@Param("department")Department department);
```

```xml
<select id="findByDepartment" resultMap="BaseResultMap" parameterType="com.wg.demo.po.Department">
    SELECT * from employee where dept_id =#{department.id} and age in
    <foreach collection="department.employees" open="(" separator="," close=")" item="employee">
        #{employee.age}
    </foreach>
</select>
```

这里foreach 对应Departmen部门中的List employees
