package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.ManufacturerDao;
import bitcamp.team.dao.ProductDao;
import bitcamp.team.dao.ProductFileDao;
import bitcamp.team.domain.Manufacturer;
import bitcamp.team.domain.Product;
import bitcamp.team.domain.ProductFile;
import bitcamp.team.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
 
  ProductDao productDao;
  ManufacturerDao manufacturerDao;
  ProductFileDao productFileDao;
  
  public ProductServiceImpl(
      ProductDao productDao, 
      ManufacturerDao manufacturerDao,
      ProductFileDao productFileDao) {
    this.productDao = productDao;
    this.manufacturerDao = manufacturerDao;
    this.productFileDao = productFileDao;
  }

  @Override
  public List<Product> list(Map<String, Object> param) {
    return productDao.findAll(param);
  }

  @Override
  public Map<String, Object> findCategory() {
    HashMap<String, Object> ctgList = new HashMap<>();
    ctgList.put("largeList", productDao.findLargeCategory());
    ctgList.put("smallList", productDao.findSmallCategory());
    return ctgList;
  }

  @Override
  public List<Manufacturer> listManufacturer() {
    return manufacturerDao.findAllUseProductAdd();
    
  }

  @Override
  public int add(Product product) {
    int count = productDao.insert(product);
    List<ProductFile> productFiles = product.getProductFiles();
    for (ProductFile f : productFiles) {
      f.setProductNo(product.getNo());
    }
    productFileDao.insert(product.getProductFiles());
    
    return count;
  }

  @Override
  public int getNo(String name) {
    Product product = productDao.findNoByName(name);
    return product.getNo();
  }
  
  @Override
  public List<Product> getList(String name) {
    return productDao.findNoByNameList(name);
  }
  
  @Override
  public String get(int no) {
    Product product = productDao.findByNo(no);
    return product.getName();
  }
  
  @Override
  public Product getFile(int no) {
    return productDao.findFileByNo(no);
  }
}










