package bitcamp.team.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Manufacturer;
import bitcamp.team.domain.Product;

public interface ProductService {
  List<Product> list(int largeNo, int smallNo, String productName);

  List<Product> list2(int largeNo, int smallNo, String keyword, String listType);

  List<Manufacturer> listManufacturer();

  List<Product> getList(String name);

  Map<String, Object> findCategory();

  int add(Product product);

  int getNo(String name);

  int update(Product product);

  Product get(int no);

  Product getFile(int no);

  int deleteProduct(HashMap<String, Object> paramNumbers);
}
