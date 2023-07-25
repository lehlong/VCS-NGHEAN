using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE;
using DMS.CORE.Entities.AD;

namespace DMS.BUSINESS.Services.AD
{
    public interface IMenuService : IGenericService<tblAdMenu, tblMenuDto>
    {
        Task<tblMenuDto> BuildDataForTree();
        Task UpdateOrderTree(tblMenuDto moduleDto);
    }

    public class MenuService : GenericService<tblAdMenu, tblMenuDto>, IMenuService
    {
        public MenuService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        /// <summary>
        /// Dựng cấu trúc nested tree
        /// </summary>
        /// <returns></returns>
        public async Task<tblMenuDto> BuildDataForTree()
        {
            var lstNode = new List<tblMenuDto>();
            var rootNode = new tblMenuDto() { Id = "MNU", PId = "-MNU", Name = "Danh sách menu" };
            lstNode.Add(rootNode);

            var lstAllMenu = (await this.GetAll()).OrderBy(x => x.OrderNumber).ToList();
            foreach (var menu in lstAllMenu)
            {
                var node = new tblMenuDto() { Id = menu.Id, Name = menu.Name, PId = menu.PId, OrderNumber = menu.OrderNumber, Icon = menu.Icon, Url = menu.Url, RightId = menu.RightId };
                lstNode.Add(node);
            }
            var nodeDict = lstNode.ToDictionary(n => n.Id);
            foreach (var item in lstNode)
            {
                tblMenuDto parentNode = null;
                if (item.PId == "-MNU" || !nodeDict.TryGetValue(item.PId, out parentNode))
                {
                    continue;
                }

                if (parentNode.Children == null)
                {
                    parentNode.Children = new List<tblMenuDto>();
                }
                parentNode.Children.Add(item);
            }
            return rootNode;
        }

        public async Task UpdateOrderTree(tblMenuDto moduleDto)
        {
            try
            {
                var lstModuleDto = new List<tblMenuDto>();
                var lstModuleUpdate = new List<tblAdMenu>();

                this.ConvertNestedToList(moduleDto, ref lstModuleDto);
                if (moduleDto.Children == null || moduleDto.Children.Count == 0)
                {
                    return;
                }
                var numberOrder = 1;
                foreach (var item in lstModuleDto)
                {
                    var module = _mapper.Map<tblAdMenu>(item);
                    module.OrderNumber = numberOrder++;
                    lstModuleUpdate.Add(module);
                }
                this._dbContext.UpdateRange(lstModuleUpdate);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        private void ConvertNestedToList(tblMenuDto node, ref List<tblMenuDto> lstNodeFlat)
        {
            if (node.Id != "MNU")
            {
                lstNodeFlat.Add(node);
            }
            if (node.Children != null && node.Children.Count > 0)
            {
                foreach (var item in node.Children)
                {
                    ConvertNestedToList(item, ref lstNodeFlat);
                }
            }
        }
    }
}
